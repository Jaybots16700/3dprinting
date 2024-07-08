"use client";

import { Badge } from "@/components/badge";
import { Divider } from "@/components/divider";
import { getAllOrders } from "@/lib/serverActions";
import { PartOrder } from "@/types";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { CheckIcon, LinkIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { WithId } from "mongodb";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Dashboard({ orders }: { orders: WithId<PartOrder>[] }) {
	return (
		<div className="mb-16 w-full max-w-3xl space-y-4">
			{orders.map((order) => (
				<Disclosure as="div" key={order._id.toString()}>
					<DisclosureButton className="flex h-10 w-full items-center justify-between rounded-xl border border-slate-700 bg-zinc-800 px-2 data-[open]:rounded-b-none">
						<div className="flex items-center space-x-2 pl-1">
							<Link href={order.link} target="_blank">
								<LinkIcon className="size-4 text-gray-400 duration-150 hover:text-white" />
							</Link>
							<span>{order.partName}</span>
						</div>
						<div className="flex outline-none">
							<Badge status={order.status} />
						</div>
					</DisclosureButton>
					<DisclosurePanel className="space-y-4 rounded-b-xl border border-t-0 border-slate-700 bg-zinc-800 p-4">
						<div className="flex w-full justify-between">
							<span className="inline">
								{"image" in order.user && (
									<img
										src={order.user.image}
										className="mr-2 inline size-6 rounded-full"
										alt="Profile Picture"
										height={24}
										width={24}
										referrerPolicy="no-referrer"
									/>
								)}
								{order.user.name}
							</span>

							<Link href={`mailto:${order.user.email}`} target="_blank">
								{order.user.email}
							</Link>
						</div>

						<Divider />

						<div className="w-full space-y-2">
							<div>
								<span className="font-light text-gray-200">Purpose: </span>
								<span className="font-semibold">{order.purpose}</span>
							</div>
							<div>
								<span className="font-light text-gray-200">Other: </span>
								<span className="font-semibold">{order.other}</span>
							</div>
							<div>
								<span className="font-light text-gray-200">Timelapse: </span>
								{order.timelapse ? (
									<CheckIcon className="inline size-4 text-green-600" />
								) : (
									<XMarkIcon className="inline size-4 text-red-500" />
								)}
							</div>
						</div>

						<Divider />

						<div className="w-full space-y-2">
							<div>
								<span className="font-light text-gray-200">School: </span>
								{order.delivery.school ? (
									<CheckIcon className="inline size-4 text-green-600" />
								) : (
									<XMarkIcon className="inline size-4 text-red-500" />
								)}
							</div>
							{order.delivery.school ? (
								<>
									<div>
										<span className="font-light text-gray-200">Period: </span>
										<span className="font-semibold">{order.delivery.period}</span>
									</div>
									<div>
										<span className="font-light text-gray-200">Room: </span>
										<span className="font-semibold">{order.delivery.room}</span>
									</div>
								</>
							) : (
								<div>
									<span className="font-light text-gray-200">Location: </span>
									<span className="font-semibold">{order.delivery.location}</span>
								</div>
							)}
						</div>

						<Divider />

						<div className="flex w-full justify-center">
							<Link
								href={`/order/${order._id.toString()}`}
								className="rounded-lg bg-blue-900 px-4 py-2 duration-150 hover:bg-blue-800">
								View More
							</Link>
						</div>
					</DisclosurePanel>
				</Disclosure>
			))}
		</div>
	);
}

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
			<Dashboard orders={orders} />{" "}
		</div>
	);
}
