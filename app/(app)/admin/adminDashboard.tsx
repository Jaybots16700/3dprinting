"use client";

import { Dashboard } from "@/components/dashboard";
import { getAllOrders } from "@/lib/serverActions";
import { PartOrder } from "@/types";
import { WithId } from "mongodb";
import { useEffect, useState } from "react";

export function AdminDashboard() {
	const [orders, setOrders] = useState<WithId<PartOrder>[]>([]);

	useEffect(() => {
		(async () => {
			setOrders(await getAllOrders());
		})();
	});

	return (
		<div className="flex flex-col items-center justify-between p-24">
			<h1 className="mb-24 text-6xl font-semibold">Admin Dashboard</h1>
			<Dashboard orders={orders} />
		</div>
	);
}
