"use client";

import { pricePerGram } from "@/lib/constants";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useRouter } from "next/navigation";

export default function Order() {
	const router = useRouter();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [partName, setPartName] = useState("");
	const [driveLink, setDriveLink] = useState("");
	const [purpose, setPurpose] = useState("");
	const [other, setOther] = useState("");
	const [timelapse, setTimelapse] = useState(false);

	return (
		<div className="flex h-full w-full flex-col items-center py-24">
			<h1 className="text-6xl font-semibold">Place an Order</h1>
			<span className="mt-4 font-light text-slate-300">Pricing: ${pricePerGram} per gram</span>

			<form className="mx-auto mt-12 w-full max-w-lg rounded-2xl border border-slate-800 bg-black p-8">
				<div className="mb-4 w-full text-center text-xl text-sky-500">Personal Information</div>

				<div className="grid md:grid-cols-2 md:gap-6">
					<div className="group relative z-0 mb-5 w-full">
						<input
							type="text"
							name="first_name"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							className="peer block w-full appearance-none border-0 border-b-2 border-gray-600 bg-transparent px-0 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-0"
							placeholder=" "
							required
						/>
						<label
							htmlFor="first_name"
							className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-500 rtl:peer-focus:translate-x-1/4">
							First name
						</label>
					</div>
					<div className="group relative z-0 mb-5 w-full">
						<input
							type="text"
							name="last_name"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							className="peer block w-full appearance-none border-0 border-b-2 border-gray-600 bg-transparent px-0 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-0"
							placeholder=" "
							required
						/>
						<label
							htmlFor="last_name"
							className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-500 rtl:peer-focus:translate-x-1/4">
							Last name
						</label>
					</div>
				</div>
				<div className="group relative z-0 mb-5 w-full">
					<input
						type="email"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="peer block w-full appearance-none border-0 border-b-2 border-gray-600 bg-transparent px-0 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-0"
						placeholder=" "
						required
					/>
					<label
						htmlFor="email"
						className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">
						Email address
					</label>
				</div>

				<Divider className="mb-6 mt-12" />
				<div className="mb-4 w-full text-center text-xl text-sky-500">Order Information</div>

				<div className="group relative z-0 mb-5 w-full">
					<input
						type="text"
						name="partName"
						value={partName}
						onChange={(e) => setPartName(e.target.value)}
						className="peer block w-full appearance-none border-0 border-b-2 border-gray-600 bg-transparent px-0 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-0"
						placeholder=" "
						required
					/>
					<label
						htmlFor="partName"
						className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">
						Part Name
					</label>
				</div>
				<div className="group relative z-0 mb-5 w-full">
					<input
						type="url"
						name="link"
						value={driveLink}
						onChange={(e) => setDriveLink(e.target.value)}
						className="peer block w-full appearance-none border-0 border-b-2 border-gray-600 bg-transparent px-0 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-0"
						placeholder=" "
						required
					/>
					<label
						htmlFor="link"
						className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">
						Google Drive Link
					</label>
					<Popover className="absolute bottom-2 right-1 size-5 text-gray-400">
						<PopoverButton className="outline-none">
							<InformationCircleIcon className="inline size-5" />
						</PopoverButton>
						<PopoverPanel
							transition
							anchor="top end"
							className="w-96 -translate-y-1 rounded bg-gray-700 px-2 py-1 text-sm font-light text-gray-200 transition duration-150 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:translate-y-0 data-[closed]:opacity-0">
							Upload all files into a Google Drive Folder and put the link here. Make sure it&apos;s shared with
							everyone with the link!
						</PopoverPanel>
					</Popover>
				</div>
				<div className="group relative z-0 mb-5 w-full">
					<input
						type="text"
						name="purpose"
						value={purpose}
						onChange={(e) => setPurpose(e.target.value)}
						className="peer block w-full appearance-none border-0 border-b-2 border-gray-600 bg-transparent px-0 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-0"
						placeholder=" "
					/>
					<label
						htmlFor="purpose"
						className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">
						What is this part for? (For strength purposes)
					</label>
				</div>
				<div className="group relative z-0 mb-5 w-full">
					<input
						type="text"
						name="other"
						value={other}
						onChange={(e) => setOther(e.target.value)}
						className="peer block w-full appearance-none border-0 border-b-2 border-gray-600 bg-transparent px-0 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-0"
						placeholder=" "
					/>
					<label
						htmlFor="purpose"
						className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">
						Anything else?
					</label>
				</div>
				<div className="group relative z-0 mb-5 flex w-full items-center space-x-2 text-sm text-gray-400">
					<input
						type="checkbox"
						name="timelapse"
						checked={timelapse}
						onChange={(e) => setTimelapse(e.target.checked)}
					/>
					<label htmlFor="timelapse">Add a timelapse? (+$2)</label>
				</div>
				<Divider className="my-6" />
				<button
					type="submit"
					className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800 sm:w-auto"
					onClick={() => {
						// store info
						router.push(`/order/success/${"id_of_some_sort"}`);
					}}>
					Submit
				</button>
			</form>
		</div>
	);
}

function Divider({ className }: { className?: string }) {
	return <div className={`h-px w-full bg-gradient-to-l from-transparent via-blue-500 to-transparent ${className}`} />;
}
