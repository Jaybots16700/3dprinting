"use client";

import { Badge } from "@/components/badge";
import { Divider } from "@/components/divider";
import { getOrder, sendPaymentEmail, updateFilament, updateStatus } from "@/lib/serverActions";
import { OrderStatus, PartOrder } from "@/types";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { CheckIcon, LinkIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Order({ params }: { params: { orderId: string } }) {
	const { orderId } = params;
	const { data: session, status } = useSession();
	const router = useRouter();
	const path = usePathname();

	const [order, setOrder] = useState<PartOrder | null>(null);

	useEffect(() => {
		(async () => setOrder(await getOrder(orderId)))();
	}, [orderId]);

	if (status === "unauthenticated") return router.push(`/signin?redirect=${path}`);
	if (!order) return <></>;

	return (
		<div className="flex h-full w-full flex-col items-center py-24">
			<h1 className="mb-24 text-6xl font-semibold">{order.partName}</h1>
			<div className="w-full max-w-3xl">
				<div className="flex h-10 w-full items-center justify-between rounded-xl rounded-b-none border border-slate-700 bg-zinc-800 px-2">
					<div className="flex items-center space-x-2 pl-1">
						<Link href={order.link} target="_blank">
							<LinkIcon className="size-4 text-gray-400 duration-150 hover:text-white" />
						</Link>
						<span>{order.partName}</span>
					</div>
					{session?.user.isAdmin ? (
						<Listbox
							value={order.status}
							onChange={async (newStatus) => {
								await updateStatus(orderId, newStatus);
								setOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
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
					) : (
						<div className="flex outline-none">
							<Badge status={order.status} />
						</div>
					)}
				</div>
				<div className="space-y-4 rounded-b-xl border border-t-0 border-slate-700 bg-zinc-800 p-4">
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

						<div className="">
							<span className="font-light text-gray-200">Other: </span>
							<span className="font-semibold">{order.other}</span>
						</div>

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

					{session?.user.isAdmin && (
						<>
							<Divider />
							<form
								className="flex w-full justify-between"
								onSubmit={async (e) => {
									e.preventDefault();
									await sendPaymentEmail(order);

									// changeStatus("awaiting payment", index, order);
								}}>
								<div className="group relative z-0 mt-1 w-1/3">
									<input
										type="number"
										name="filament"
										defaultValue={order.filament}
										onChange={(e) => updateFilament(orderId.toString(), e.target.valueAsNumber)}
										className="peer block w-full appearance-none border-0 border-b-2 border-gray-600 bg-transparent px-0 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-0"
										placeholder=" "
										required
									/>
									<label
										htmlFor="filament"
										className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">
										Material (g)<span className="text-red-500"> *</span>
									</label>
								</div>

								<div className="flex items-center">
									<button type="submit" className="rounded-lg bg-blue-900 px-4 py-2 duration-150 hover:bg-blue-800">
										Send Payment Email
									</button>
								</div>
							</form>
						</>
					)}
				</div>
			</div>
			{session?.user.email === order.user.email && (
				<Link href={`/order/${orderId}/edit`} className="mt-12 rounded-lg bg-blue-900 px-4 py-2 hover:bg-blue-800">
					Edit
				</Link>
			)}
		</div>
	);
}
