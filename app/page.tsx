"use client";

import { badgeStyles } from "@/lib/constants";
import { getAllOrders } from "@/lib/serverActions";
import { PartOrder } from "@/types";
import { ArrowLongRightIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
	const [orders, setOrders] = useState<PartOrder[]>([]);

	useEffect(() => {
		(async () => setOrders(await getAllOrders()))();
	}, []);

	console.log(new Date().toISOString());

	return (
		<main className="flex flex-col items-center justify-between p-24">
			<div className="mb-16 w-full max-w-3xl space-y-4">
				{orders.map((order) => (
					<div
						key={order.link}
						className="flex h-10 w-full items-center justify-between rounded-xl border border-slate-700 bg-zinc-800 px-4 pr-2">
						{order.name}
						<span className={`rounded px-2.5 py-0.5 text-xs font-medium ${badgeStyles[order.status]}`}>
							{order.status.substring(0, 1).toUpperCase() + order.status.substring(1)}
						</span>
					</div>
				))}
			</div>
			<Link
				href="/order"
				className="group flex items-center space-x-1.5 rounded-lg border border-slate-800 py-2 pl-5 pr-4 text-2xl duration-200 hover:border-blue-600/30">
				<span>Order!</span>
				<ArrowLongRightIcon className="size-6 text-blue-600/50 duration-200 group-hover:translate-x-2 group-hover:text-blue-600" />
			</Link>
		</main>
	);
}
