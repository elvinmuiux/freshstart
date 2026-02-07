import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../lib/supabaseAdmin";
const TABLE_NAME = "menu_items";

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Unexpected error.";

const getSupabaseAdminSafe = () => {
  try {
    return getSupabaseAdmin();
  } catch {
    return null;
  }
};

const requireSupabase = () => {
  const client = getSupabaseAdminSafe();
  if (!client) {
    throw new Error(
      "Supabase yapılandırması eksik. Kalıcı menü kaydı için SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY gereklidir."
    );
  }
  return client;
};

const normalizeItem = (item: Record<string, unknown>) => ({
  id: String(item.id),
  sectionSlug: String(item.section_slug ?? ""),
  name: (item.name as Record<string, string>) ?? {},
  description: (item.description as Record<string, string>) ?? {},
  price: String(item.price ?? ""),
  image: String(item.image ?? ""),
  sortOrder: Number(item.sort_order ?? 0),
});

type MenuItemInput = {
  sectionSlug: string;
  name: Record<string, string>;
  description: Record<string, string>;
  price: string;
  image: string;
  sortOrder?: number;
};

export async function GET() {
  try {
    const supabaseAdmin = requireSupabase();
    // Limitsiz erişim için limit belirtilmedi
    const { data, error } = await supabaseAdmin
      .from(TABLE_NAME)
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const items = (data ?? []).map((item) =>
      normalizeItem(item as Record<string, unknown>)
    );
    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabaseAdmin = requireSupabase();
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
      sort_order: Number.isFinite(body.sortOrder) ? body.sortOrder : 0,
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
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const supabaseAdmin = requireSupabase();
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
      sort_order: Number.isFinite(body.sortOrder) ? body.sortOrder : 0,
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
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const supabaseAdmin = requireSupabase();
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    const clearAll = url.searchParams.get("all");

    if (clearAll === "1") {
      const { error } = await supabaseAdmin
        .from(TABLE_NAME)
        .delete()
        .neq("id", "");
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
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
