import { getToken } from "next-auth/jwt";

import { NextResponse } from "next/server";


export async function middleware(request) {

    const session = await request.cookies.get("next-auth.session-token");
    console.log(session)
    
    const pertokenan = await getToken({req : request, secret: process.env.NEXTAUTH_SECRET})
    console.log(pertokenan)


    if (!pertokenan) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher : ['/TampilData/:path*','/Transaksi/:path*','/Pengembalian/:path*','/Pengembalian/:path*','/Mobil:path*','/Pelanggan:path*']
}