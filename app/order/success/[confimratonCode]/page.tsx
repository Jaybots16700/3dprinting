"use client";

import { pricePerGram } from "@/lib/constants";

export default function Success() {
	const email = "[EMAIL]";

	return (
		<div className="flex h-full w-full flex-col items-center py-24">
			<h1 className="text-6xl font-semibold">Order Placed!</h1>
			<p className="mt-4 max-w-xl text-center font-light text-slate-300">
				You will receive an email with in the next few days with the price ($0.05 per gram) and payment/delivery
				information to {email}. We will reach out with any questions about your order.
			</p>
		</div>
	);
}
