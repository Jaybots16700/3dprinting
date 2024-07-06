"use client";

import { Badge } from "@/components/badge";
import { Divider } from "@/components/divider";
import { getAllOrders, updateFilament, updateStatus } from "@/lib/serverActions";
import { PartOrder, OrderStatus } from "@/types";
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, LinkIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { WithId } from "mongodb";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
	const [orders, setOrders] = useState<WithId<PartOrder>[]>([]);

	useEffect(() => {
		(async () => setOrders(await getAllOrders()))();
	}, []);

	return (
		<div className="flex flex-col items-center justify-between p-24">
			<h1 className="mb-24 text-6xl font-semibold">Admin Dashboard</h1>
			<div className="mb-16 w-full max-w-3xl space-y-4">
				{orders.map((order, index) => (
					<Disclosure as="div" key={order._id.toString()}>
						<DisclosureButton className="flex h-10 w-full items-center justify-between rounded-xl border border-slate-700 bg-zinc-800 px-2 data-[open]:rounded-b-none">
							<div className="flex items-center space-x-2 pl-1">
								<Link href={order.link} target="_blank">
									<LinkIcon className="size-4 text-gray-400 duration-150 hover:text-white" />
								</Link>
								<span>{order.partName}</span>
							</div>
							<Listbox
								value={order.status}
								onChange={async (newStatus) => {
									await updateStatus(order._id.toString(), newStatus);
									setOrders((prev) => [
										...prev.slice(0, index),
										{ ...prev[index], status: newStatus },
										...prev.slice(index + 1),
									]);
								}}>
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
								<div className="">
									<span className="font-light text-gray-200">Purpose: </span>
									<span className="font-semibold">{order.purpose}</span>
								</div>
								{order.other && (
									<div className="">
										<span className="font-light text-gray-200">Other: </span>
										<span className="font-semibold">{order.other}</span>
									</div>
								)}
								<div className="">
									<span className="font-light text-gray-200">Timelapse: </span>
									{order.timelapse ? (
										<CheckIcon className="inline size-4 text-green-600" />
									) : (
										<XMarkIcon className="inline size-4 text-red-500" />
									)}
								</div>
							</div>

							<Divider />

							<div className="flex w-full justify-between">
								<div className="group relative z-0 mt-1 w-1/3">
									<input
										type="number"
										name="filament"
										defaultValue={order.filament}
										onChange={(e) => updateFilament(order._id.toString(), e.target.valueAsNumber)}
										className="peer block w-full appearance-none border-0 border-b-2 border-gray-600 bg-transparent px-0 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-0"
										placeholder=" "
									/>
									<label
										htmlFor="filament"
										className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">
										Material (g)
									</label>
								</div>

								<div className="flex items-center">
									<button className="rounded-lg bg-blue-900 px-4 py-2 duration-150 hover:bg-blue-800" type="button">
										Send Payment Email
									</button>
								</div>
							</div>
						</DisclosurePanel>
					</Disclosure>
				))}
			</div>
		</div>
	);
}
