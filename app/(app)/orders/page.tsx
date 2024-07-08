"use client";

import { Dashboard } from "@/components/dashboard";
import { getOrdersByUser } from "@/lib/serverActions";
import { PartOrder } from "@/types";
import { WithId } from "mongodb";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserDashboard() {
	const { status } = useSession();
	const path = usePathname();
	const router = useRouter();

	const [orders, setOrders] = useState<WithId<PartOrder>[]>([]);

	useEffect(() => {
		(async () => {
			setOrders(await getOrdersByUser());
		})();
	}, [status]);

	if (status === "unauthenticated") return router.push(`/signin?redirect=${path}`);

	return (
		<div className="flex flex-col items-center justify-between p-24">
			<h1 className="mb-24 text-6xl font-semibold">Your Orders</h1>
			<Dashboard orders={orders} />
		</div>
	);
}
