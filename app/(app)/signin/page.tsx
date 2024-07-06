"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import GoogleSignInIcon from "@/public/icons/googleSignIn.svg";

export default function SignIn() {
	const { status } = useSession();
	const router = useRouter();

	const redirectUrl = useSearchParams().get("redirect") ?? "/";

	if (status === "authenticated") router.push(redirectUrl);
	return (
		<div className="flex h-full w-full flex-col items-center py-24">
			<h1 className="mb-24 text-6xl font-semibold">Welcome Back!</h1>
			<button
				type="button"
				className="flex-inline relative mx-auto mt-12 flex rounded bg-white px-5 py-3 text-xl"
				onClick={() => signIn("google")}>
				<div className="flex flex-1 items-center">
					<Image src={GoogleSignInIcon} alt="Google OAuth Sign in" />
				</div>
				<span className="flex-auto pl-3 text-gray-800">Continue With Google</span>
			</button>
		</div>
	);
}
