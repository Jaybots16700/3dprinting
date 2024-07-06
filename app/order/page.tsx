"use client";

import { pricePerGram } from "@/lib/constants";

export default function Order() {
	return (
		<div className="flex h-full w-full flex-col items-center py-24">
			<h1 className="text-6xl font-semibold">Place an Order</h1>
			<span className="mt-4 font-light text-slate-300">Pricing: ${pricePerGram} per gram</span>

			<form className="mx-auto mt-12 w-full max-w-lg rounded-2xl border border-slate-800 p-8">
				<div className="grid md:grid-cols-2 md:gap-6">
					<div className="group relative z-0 mb-5 w-full">
						<input
							type="text"
							name="floating_first_name"
							id="floating_first_name"
							className="peer block w-full appearance-none border-0 border-b-2 border-gray-600 bg-transparent px-0 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-0"
							placeholder=" "
							required
						/>
						<label
							htmlFor="floating_first_name"
							className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-500 rtl:peer-focus:translate-x-1/4">
							First name
						</label>
					</div>
					<div className="group relative z-0 mb-5 w-full">
						<input
							type="text"
							name="floating_last_name"
							id="floating_last_name"
							className="peer block w-full appearance-none border-0 border-b-2 border-gray-600 bg-transparent px-0 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-0"
							placeholder=" "
							required
						/>
						<label
							htmlFor="floating_last_name"
							className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-500 rtl:peer-focus:translate-x-1/4">
							Last name
						</label>
					</div>
				</div>
				<div className="group relative z-0 mb-5 w-full">
					<input
						type="email"
						name="floating_email"
						id="floating_email"
						className="peer block w-full appearance-none border-0 border-b-2 border-gray-600 bg-transparent px-0 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-0"
						placeholder=" "
						required
					/>
					<label
						htmlFor="floating_email"
						className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">
						Email address
					</label>
				</div>

				<button
					type="submit"
					className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800 sm:w-auto">
					Submit
				</button>
			</form>
		</div>
	);
}
