import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../lib/supabaseAdmin";

const BUCKET_NAME = process.env.SUPABASE_STORAGE_BUCKET || "menu-images";
const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Unexpected error.";

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
  try {
    let supabaseAdmin = null;
    try {
      supabaseAdmin = getSupabaseAdmin();
    } catch (error) {
      supabaseAdmin = null;
    }
    if (!supabaseAdmin) {
      return NextResponse.json(
        {
          error:
            "Supabase yapılandırması eksik. Kalıcı görsel yükleme için SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY gereklidir.",
        },
        { status: 500 }
      );
    }
    let mimeType = "";
    let buffer: Buffer | null = null;

    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file");
      if (!file || !(file instanceof File)) {
        return NextResponse.json(
          { error: "Missing file." },
          { status: 400 }
        );
      }
      mimeType = file.type || "image/jpeg";
      const arrayBuffer = await file.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    } else {
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

      mimeType = parsed.mimeType;
      buffer = Buffer.from(parsed.base64, "base64");
    }

    const extension = extensionFromMime(mimeType);
    const fileName = `menu-items/${Date.now()}-${crypto.randomUUID()}.${extension}`;

    if (!buffer) {
      return NextResponse.json(
        { error: "Upload buffer could not be created." },
        { status: 400 }
      );
    }

    const { error: uploadError } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .upload(fileName, buffer, {
        contentType: mimeType,
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data } = supabaseAdmin.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);

    return NextResponse.json({ url: data.publicUrl }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
