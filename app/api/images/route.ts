import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../lib/supabaseAdmin";

const BUCKET_NAME = process.env.SUPABASE_STORAGE_BUCKET || "menu-images";

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Unexpected error.";

const requireSupabase = () => {
  try {
    return getSupabaseAdmin();
  } catch {
    return null;
  }
};

export async function GET(request: Request) {
  try {
    const supabaseAdmin = requireSupabase();
    if (!supabaseAdmin) {
      return NextResponse.json(
        {
          error:
            "Supabase yapılandırması eksik. Görsel erişimi için SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY gereklidir.",
        },
        { status: 500 }
      );
    }

    const url = new URL(request.url);
    const path = url.searchParams.get("path");
    if (!path) {
      return NextResponse.json({ error: "Missing path." }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .download(path);

    if (error || !data) {
      return NextResponse.json(
        { error: error?.message ?? "Image not found." },
        { status: 404 }
      );
    }

    const arrayBuffer = await data.arrayBuffer();
    const contentType = data.type || "application/octet-stream";

    return new NextResponse(Buffer.from(arrayBuffer), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
