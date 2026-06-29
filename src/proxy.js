import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { cookies, headers } from "next/headers"; 

export async function proxy(request) {
   const session = await auth.api.getSession({
    headers: await headers()
   }) 

   const {pathname} = request.nextUrl;
   
   if(!session){
    return NextResponse.redirect(new URL('/signin', request.url));
   }
   
   const role = session?.user?.role;
   
   if(pathname.startsWith("/dashboard/admin") && role !== "admin"){
    return NextResponse.redirect(new URL('/unauthorized', request.url));
   }
   if(pathname.startsWith("/dashboard/volunteer") && role !== "volunteer"){
    return NextResponse.redirect(new URL('/unauthorized', request.url));
   }
   if(pathname.startsWith("/dashboard/donor") && role !== "donor"){
    return NextResponse.redirect(new URL('/unauthorized', request.url));
   }


}

export const config = {
    matcher: ['/dashboard/:path*', "/donation-requests/:path"]
}




// import { NextResponse } from "next/server";
// import { auth } from "./lib/auth";
// import { cookies, headers } from "next/headers"; 

// export async function proxy(request) {
//    const session = await auth.api.getSession({
//     headers: await headers()
//    }) 

//    if(session?.user?.role === "seller" && session?.user?.plan === "free"){
//     return NextResponse.redirect(new URL('/pricing', request.url))
//    }

//    if(!session){
//     return NextResponse.redirect(new URL('/signin', request.url))
//    }

// }

// export const config = {
//     matcher: ['/profile', '/dashboard/seller']
// }
