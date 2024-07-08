"use client";

import { pricePerGram } from "@/lib/constants";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addOrder } from "@/lib/serverActions";
import { useSession } from "next-auth/react";
import OrderForm from "@/components/orderForm";

export default function Order() {
	const { data: session } = useSession();

	const router = useRouter();

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
		session?.user.name && setUsername(session.user.name);
		session?.user.email && setEmail(session.user.email);
	}, [session]);

	return (
		<div className="flex h-full w-full flex-col items-center py-24">
			<h1 className="text-6xl font-semibold">Place an Order</h1>
			<span className="mt-4 font-light text-slate-300">Pricing: ${pricePerGram} per gram</span>

			<OrderForm
				onSubmit={async (e) => {
					e.preventDefault();
					const orderId = await addOrder({
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
					router.push(`/order/${orderId}/success`);
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
			/>
		</div>
	);
}
