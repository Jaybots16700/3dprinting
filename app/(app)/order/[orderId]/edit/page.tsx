"use client";

import { pricePerGram } from "@/lib/constants";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { usePathname, useRouter } from "next/navigation";
import { addOrder, getOrder, updateOrder } from "@/lib/serverActions";
import { Divider } from "@/components/divider";
import { useSession } from "next-auth/react";
import { Delivery, PartOrder } from "@/types";
import OrderForm from "@/components/orderForm";

export default function Edit({ params }: { params: { orderId: string } }) {
	const { orderId } = params;
	const { status } = useSession();
	const router = useRouter();
	const path = usePathname();

	const [order, setOrder] = useState<PartOrder | null>(null);

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [partName, setPartName] = useState("");
	const [driveLink, setDriveLink] = useState("");
	const [purpose, setPurpose] = useState("");
	const [other, setOther] = useState("");
	const [timelapse, setTimelapse] = useState(false);

	const [school, setSchool] = useState(true);
	const [period, setPeriod] = useState<undefined | number>(undefined);
	const [room, setRoom] = useState("");
	const [location, setLocation] = useState("");

	useEffect(() => {
		(async () => setOrder(await getOrder(orderId)))();
	}, [orderId]);

	useEffect(() => {
		if (!order) return;

		setUsername(order.user.name);
		setEmail(order.user.email);
		setPartName(order.partName);
		setDriveLink(order.link);
		setPurpose(order.purpose);
		setOther(order.other);
		setTimelapse(order.timelapse);

		setSchool(order.delivery.school);
		if (order.delivery.school) {
			setPeriod(order.delivery.period);
			setRoom(order.delivery.room);
		} else {
			setLocation(order.delivery.location);
		}
	}, [order]);

	if (status === "unauthenticated") return router.push(`/signin?redirect=${path}`);
	if (!order) return <></>;

	return (
		<div className="flex h-full w-full flex-col items-center py-24">
			<h1 className="text-6xl font-semibold">Edit your Order</h1>
			<span className="mt-4 font-light text-slate-300">Pricing: ${pricePerGram} per gram</span>

			<OrderForm
				onSubmit={async (e) => {
					e.preventDefault();
					await updateOrder(orderId, {
						partName,
						user: {
							name: username,
							email,
						},
						link: driveLink,
						purpose,
						other,
						timelapse,
						timestamp: new Date(),
						status: "received",
						delivery: school ? { school, period: period as number, room } : { school, location },
					});
					router.push(`/order/${orderId}`);
				}}
				states={{
					setUsername,
					email,
					setEmail,
					partName,
					setPartName,
					driveLink,
					setDriveLink,
					purpose,
					setPurpose,
					other,
					setOther,
					timelapse,
					setTimelapse,
					school,
					setSchool,
					period,
					setPeriod,
					room,
					setRoom,
					location,
					setLocation,
					username,
				}}
				type="edit"
			/>
		</div>
	);
}
