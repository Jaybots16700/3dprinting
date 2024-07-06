"use client";

import { Badge } from "@/components/badge";
import { getAllOrders } from "@/lib/serverActions";
import { PartOrder } from "@/types";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
	const [orders, setOrders] = useState<PartOrder[]>([]);

	useEffect(() => {
		(async () => setOrders(await getAllOrders()))();
	}, []);

	return (
		<div className="flex flex-col items-center justify-between p-24">
			<div className="mb-16 w-full max-w-3xl space-y-4">
				{orders.map((order) => (
					<div
						key={order.link}
						className="flex h-10 w-full items-center justify-between rounded-xl border border-slate-700 bg-zinc-800 px-4 pr-2">
						<span>{order.partName}</span>
						<Badge status={order.status} />
					</div>
				))}
			</div>
		</div>
	);
}
