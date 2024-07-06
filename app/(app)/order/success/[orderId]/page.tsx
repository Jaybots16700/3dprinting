"use client";

import { pricePerGram } from "@/lib/constants";
import { getOrder } from "@/lib/serverActions";
import { PartOrder } from "@/types";
import { useEffect, useState } from "react";

export default function Success({ params }: { params: { orderId: string } }) {
	const [order, setOrder] = useState<PartOrder | null>(null);

	useEffect(() => {
		(async () => setOrder(await getOrder(params.orderId)))();
	}, [params.orderId]);

	return (
		<div className="flex h-full w-full flex-col items-center py-24">
			<h1 className="text-6xl font-semibold">Order Placed!</h1>
			<p className="mt-4 max-w-xl text-center font-light text-slate-300">
				You will receive an email with in the next few days with the price (${pricePerGram} per gram
				{order?.timelapse ? " + $2 for the timelapse" : ""}) and payment/delivery information to {order?.user.email}. We
				will reach out with any questions about your order.
			</p>
		</div>
	);
}
