import { NextRequest, NextResponse } from "next/server";
import { getRoleByToken } from "./services/role";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/login-manager") {
    const cookie = request.cookies.get("mg-23-token");

    if (cookie) {
      try {
        const role = await getRoleByToken(cookie.value);

        if (role?.name === "Customer" || role?.name === "Installer") {
          return NextResponse.redirect(new URL("/", request.url));
        }

        return NextResponse.redirect(new URL("/dashboard", request.url));
      } catch (error) {
        console.log(error);
      }
    }
  }
}

export const config = {
  matcher: ["/login-manager"],
};
