import {
  clerkMiddleware,
  createRouteMatcher,
  authMiddleware,
} from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/sign-in", "/sign-up"]);

//  export default clerkMiddleware((auth, request) => {
//   auth().protect();
// });

export default authMiddleware({});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
