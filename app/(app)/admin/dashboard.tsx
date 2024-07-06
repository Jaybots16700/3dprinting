"use client";

import { Badge } from "@/components/badge";
import { getAllOrders } from "@/lib/serverActions";
import { PartOrder, OrderStatus } from "@/types";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
	const [orders, setOrders] = useState<PartOrder[]>([]);

	useEffect(() => {
		(async () => setOrders(await getAllOrders()))();
	}, []);

	return (
		<div className="flex flex-col items-center justify-between p-24">
			<h1 className="mb-24 text-6xl font-semibold">Admin Dashboard</h1>
			<div className="mb-16 w-full max-w-3xl space-y-4">
				{orders.map((order, index) => (
					<div
						key={order.link}
						className="flex h-10 w-full items-center justify-between rounded-xl border border-slate-700 bg-zinc-800 px-4 pr-2">
						<span>{order.partName}</span>
						<Listbox value={order.status}>
							<ListboxButton className="flex outline-none">
								<Badge status={order.status} />
							</ListboxButton>
							<ListboxOptions
								anchor="bottom"
								transition
								className="flex translate-y-1 flex-col items-center space-y-1 rounded-xl border border-zinc-700 bg-zinc-800 p-2 transition duration-150 ease-in [--anchor-gap:var(--spacing-1)] focus:outline-none data-[leave]:data-[closed]:opacity-0">
								{["received", "queued", "printing", "awaiting payment", "completed", "delivered"]
									.filter((s) => s !== order.status)
									.map((status) => (
										<ListboxOption
											key={status}
											value={status}
											className="flex w-full cursor-pointer items-center justify-center rounded p-1 duration-150 hover:bg-zinc-700/50">
											<Badge status={status as OrderStatus} />
										</ListboxOption>
									))}
							</ListboxOptions>
						</Listbox>
					</div>
				))}
			</div>
		</div>
	);
}
