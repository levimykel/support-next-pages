import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // console.log({ request });
  // return NextResponse.rewrite(
  //   new URL("/fr/field/le-content-relationship/:path*", request.url)
  // );
}

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: "/field/content-relationship/:path*",
// };
