"use client";

import { Badge } from "@/components/badge";
import { Divider } from "@/components/divider";
import { getOrder } from "@/lib/serverActions";
import { PartOrder } from "@/types";
import { CheckIcon, LinkIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Order({ params }: { params: { orderId: string } }) {
	const { orderId } = params;
	const { status } = useSession();
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
					<div className="flex outline-none">
						<Badge status={order.status} />
					</div>
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
				</div>
			</div>
			<Link href={`/order/${orderId}/edit`} className="mt-12 rounded-lg bg-blue-700 px-4 py-2 hover:bg-blue-600">
				Edit
			</Link>
		</div>
	);
}
