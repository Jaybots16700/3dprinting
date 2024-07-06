import NextAuth from "next-auth";
import { type NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

const handler = (req: NextRequest, context: { params: { nextauth: string[] } }) => {
	if (req.method === "HEAD" || /lua-resty-http.+ngx_lua/.test(req.headers.get("user-agent") || "")) {
		console.log("Bot detected");
		return redirect("/");
	}
	if (req.method === "POST")
		if (req.nextUrl.pathname + req.nextUrl.search === "/api/auth/signin?error=OAuthAccountNotLinked")
			return redirect("/error?error=OAuthAccountNotLinked");
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return NextAuth(req as any, context as any, authOptions);
};

export { handler as GET, handler as POST };
