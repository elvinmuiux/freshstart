import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../lib/supabaseAdmin";

const TABLE_NAME = "menu_items";

type MenuItemInput = {
  sectionSlug: string;
  name: Record<string, string>;
  description: Record<string, string>;
  price: string;
  image: string;
};

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from(TABLE_NAME)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const items = (data ?? []).map((item) =>
    normalizeItem(item as Record<string, unknown>)
  );
  return NextResponse.json({ items }, { status: 200 });
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<MenuItemInput>;
  if (!body.sectionSlug || !body.price || !body.name) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  const payload = {
    section_slug: body.sectionSlug,
    name: body.name,
    description: body.description ?? {},
    price: body.price,
    image: body.image ?? "",
  };

  const { data, error } = await supabaseAdmin
    .from(TABLE_NAME)
    .insert(payload)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ item: normalizeItem(data) }, { status: 200 });
}

export async function PUT(request: Request) {
  const body = (await request.json()) as Partial<MenuItemInput> & {
    id?: string;
  };
  if (!body.id) {
    return NextResponse.json({ error: "Missing id." }, { status: 400 });
  }

  const payload = {
    section_slug: body.sectionSlug,
    name: body.name,
    description: body.description,
    price: body.price,
    image: body.image,
  };

  const { data, error } = await supabaseAdmin
    .from(TABLE_NAME)
    .update(payload)
    .eq("id", body.id)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ item: normalizeItem(data) }, { status: 200 });
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const clearAll = url.searchParams.get("all");

  if (clearAll === "1") {
    const { error } = await supabaseAdmin.from(TABLE_NAME).delete().neq("id", "");
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  if (!id) {
    return NextResponse.json({ error: "Missing id." }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from(TABLE_NAME).delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}

const normalizeItem = (item: Record<string, unknown>) => ({
  id: String(item.id),
  sectionSlug: String(item.section_slug ?? ""),
  name: (item.name as Record<string, string>) ?? {},
  description: (item.description as Record<string, string>) ?? {},
  price: String(item.price ?? ""),
  image: String(item.image ?? ""),
});
