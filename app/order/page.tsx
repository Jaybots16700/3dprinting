"use client";

import { pricePerGram } from "@/lib/constants";

export default function Order() {
	return (
		<div className="flex h-full w-full flex-col items-center py-24">
			<h1 className="text-6xl font-semibold">Place an Order</h1>
			<span className="mt-4 font-light text-slate-300">Pricing: ${pricePerGram} per gram</span>

			<form className="mt-12 w-full max-w-3xl space-y-8 rounded-3xl border border-slate-700 px-8 py-6">
				<div className="space-y-2">
					<span className="text-2xl">Name</span>
					<input
						type="text"
						className="block w-96 rounded border border-white/10 bg-white/5 px-3 py-1 outline-none"
						placeholder="First Name"
						required
					/>
					<input
						type="text"
						className="block w-96 rounded border border-white/10 bg-white/5 px-3 py-1 outline-none"
						placeholder="Last Name"
						required
					/>
				</div>
				<div className="space-y-2">
					<span className="text-2xl">Email</span>
					<input
						type="email"
						className="block w-96 rounded border border-white/10 bg-white/5 px-3 py-1 outline-none"
						placeholder="3dprinting@jaybots.org"
						required
					/>
				</div>
			</form>
		</div>
	);
}
