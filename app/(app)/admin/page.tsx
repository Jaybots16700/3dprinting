import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Admin() {
	const session = await getServerSession(authOptions);

	if (!session) redirect("/signin?redirect=admin");

	if (!session.user.isAdmin)
		return (
			<div className="flex h-full w-full flex-col items-center py-24">
				<h1 className="text-6xl font-semibold">Unauthorized</h1>
			</div>
		);

	return <></>;
}
