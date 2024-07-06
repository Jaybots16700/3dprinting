import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { clientPromise, connectToDatabase } from "@/lib/mongodb";
import { env } from "@/env";
import type { User } from "@/types";

export const authOptions: NextAuthOptions = {
	adapter: MongoDBAdapter(clientPromise, { databaseName: "3dprinting" }),
	providers: [GoogleProvider({ clientId: env.GOOGLE_CLIENT_ID, clientSecret: env.GOOGLE_CLIENT_SECRET })],
	callbacks: {
		async session({ session, user }) {
			/* eslint-disable no-param-reassign */
			session.user.id = user.id;
			session.user.isAdmin = (user as User).isAdmin ?? false;
			/* eslint-enable no-param-reassign */
			return session;
		},
		async redirect({ url, baseUrl }) {
			// Allows relative callback URLs
			if (url.startsWith("/")) return `${baseUrl}${url}`;
			// Allows callback URLs on the same origin
			if (new URL(url).origin === baseUrl) return url;
			return baseUrl;
		},
	},
	pages: {
		signIn: "/signin",
	},
	secret: env.NEXTAUTH_SECRET,
	debug: false, // env.NODE_ENV === "development",
};
