import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const headers = new Headers(request.headers);
  const match = request.nextUrl.pathname.match(/^\/(en|de)(?:\/|$)/);
  headers.set("x-studio-locale", match?.[1] ?? "tr");
  return NextResponse.next({ request: { headers } });
}

export const config = { matcher: ["/((?!_next|portfolio|favicon.ico).*)"] };
