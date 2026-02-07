import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const ADMIN_ROLE = "admin";

const getSupabaseAuthClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};

const isProtectedRoute = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/ekle")) {
    return true;
  }
  if (pathname.startsWith("/api/uploads")) {
    return true;
  }
  if (pathname.startsWith("/api/menu-items")) {
    return request.method !== "GET";
  }
  return false;
};

const isAdminUser = (user: {
  email?: string | null;
  app_metadata?: any;
  user_metadata?: any;
}) => {
  const role = user?.app_metadata?.role ?? user?.user_metadata?.role ?? null;
  if (role === ADMIN_ROLE) {
    return true;
  }
  const allowlist = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
  const email = user?.email?.toLowerCase() ?? "";
  return allowlist.includes(email);
};

export async function proxy(request: NextRequest) {
  if (!isProtectedRoute(request)) {
    return NextResponse.next();
  }

  const token = request.cookies.get("fs_admin_token")?.value;
  if (!token) {
    if (request.nextUrl.pathname.startsWith("/ekle")) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      loginUrl.searchParams.set("next", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const supabase = getSupabaseAuthClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase auth is not configured." },
      { status: 500 }
    );
  }

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) {
    if (request.nextUrl.pathname.startsWith("/ekle")) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      loginUrl.searchParams.set("next", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  if (!isAdminUser(data.user)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/ekle/:path*", "/api/uploads/:path*", "/api/menu-items/:path*"],
};
