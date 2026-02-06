import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../lib/supabaseAdmin";

const BUCKET_NAME = process.env.SUPABASE_STORAGE_BUCKET || "menu-images";

const parseDataUrl = (dataUrl: string) => {
  const match = dataUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
  if (!match) {
    return null;
  }
  return { mimeType: match[1], base64: match[2] };
};

const extensionFromMime = (mimeType: string) => {
  const [, subtype] = mimeType.split("/");
  return subtype === "jpeg" ? "jpg" : subtype;
};

export async function POST(request: Request) {
  const body = (await request.json()) as { dataUrl?: string };
  if (!body.dataUrl) {
    return NextResponse.json(
      { error: "Missing dataUrl." },
      { status: 400 }
    );
  }

  const parsed = parseDataUrl(body.dataUrl);
  if (!parsed) {
    return NextResponse.json(
      { error: "Invalid data URL." },
      { status: 400 }
    );
  }

  const extension = extensionFromMime(parsed.mimeType);
  const fileName = `menu-items/${Date.now()}-${crypto.randomUUID()}.${extension}`;
  const buffer = Buffer.from(parsed.base64, "base64");

  const { error: uploadError } = await supabaseAdmin.storage
    .from(BUCKET_NAME)
    .upload(fileName, buffer, {
      contentType: parsed.mimeType,
      upsert: false,
    });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { data } = supabaseAdmin.storage.from(BUCKET_NAME).getPublicUrl(fileName);

  return NextResponse.json({ url: data.publicUrl }, { status: 200 });
}
