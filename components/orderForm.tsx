import { FormEvent } from "react";
import { Divider } from "./divider";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

export default function OrderForm({
	onSubmit,
	states,
	type,
}: {
	onSubmit: (e: FormEvent<HTMLFormElement>) => void;
	states: {
		username: string;
		setUsername: (value: string) => void;
		email: string;
		setEmail: (value: string) => void;
		partName: string;
		setPartName: (value: string) => void;
		driveLink: string;
		setDriveLink: (value: string) => void;
		purpose: string;
		setPurpose: (value: string) => void;
		other: string;
		setOther: (value: string) => void;
		timelapse: boolean;
		setTimelapse: (value: boolean) => void;
		school: boolean;
		setSchool: (value: boolean) => void;
		period: number | undefined;
		setPeriod: (value: number | undefined) => void;
		room: string;
		setRoom: (value: string) => void;
		location: string;
		setLocation: (value: string) => void;
	};
	type: "new" | "edit";
}) {
	const {
		username,
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
	} = states;

	return (
		<form
			className="mx-auto mt-12 w-full max-w-lg rounded-2xl border border-slate-800 bg-black p-8"
			onSubmit={onSubmit}>
			<div className="mb-4 w-full text-center text-xl text-sky-500">Personal Information</div>

			<div className="group relative z-0 mb-5 w-full">
				<input
					type="text"
					name="name"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className="peer block w-full appearance-none border-0 border-b-2 border-gray-600 bg-transparent px-0 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-0"
					placeholder=" "
					required
				/>
				<label
					htmlFor="name"
					className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-500 rtl:peer-focus:translate-x-1/4">
					Name<span className="text-red-500"> *</span>
				</label>
			</div>
			<div className="group relative z-0 mb-5 w-full">
				<input
					type="email"
					name="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className={`peer block w-full appearance-none border-0 border-b-2 border-gray-600 bg-transparent px-0 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-0 disabled:cursor-not-allowed ${type === "edit" ? "text-gray-400" : "text-white"}`}
					placeholder=" "
					required
					disabled={type === "edit"}
				/>
				<label
					htmlFor="email"
					className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">
					Email address<span className="text-red-500"> *</span>
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
					Part Name<span className="text-red-500"> *</span>
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
					Google Drive Link<span className="text-red-500"> *</span>
				</label>
				<Popover className="absolute bottom-2 right-1 size-5 text-gray-400">
					<PopoverButton className="outline-none">
						<InformationCircleIcon className="inline size-5" />
					</PopoverButton>
					<PopoverPanel
						transition
						anchor="top end"
						className="w-96 -translate-y-1 rounded bg-gray-700 px-2 py-1 text-sm font-light text-gray-200 transition duration-150 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:translate-y-0 data-[closed]:opacity-0">
						Upload all files into a Google Drive Folder and put the link here. Make sure it&apos;s shared with everyone
						with the link!
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
					htmlFor="other"
					className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">
					Anything else?
				</label>
			</div>
			<div className="group relative z-0 mb-5 flex w-full items-center space-x-2 text-sm text-gray-400">
				<input type="checkbox" name="timelapse" checked={timelapse} onChange={(e) => setTimelapse(e.target.checked)} />
				<label htmlFor="timelapse">Add a timelapse? (+$2)</label>
			</div>

			<Divider className="mb-6 mt-12" />
			<div className="mb-4 w-full text-center text-xl text-sky-500">Delivery Information</div>

			<div className="group relative z-0 mb-5 flex w-full items-center space-x-2 text-sm text-gray-400">
				<input type="checkbox" name="school" checked={school} onChange={(e) => setSchool(e.target.checked)} />
				<label htmlFor="school">Can we deliver it at school?</label>
			</div>
			{school ? (
				<div className="flex space-x-4">
					<div className="group relative z-0 mb-5 w-full">
						<input
							type="text"
							name="room"
							value={room}
							onChange={(e) => setRoom(e.target.value)}
							className="peer block w-full appearance-none border-0 border-b-2 border-gray-600 bg-transparent px-0 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-0"
							placeholder=" "
							required
						/>
						<label
							htmlFor="room"
							className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">
							What room?<span className="text-red-500"> *</span>
						</label>
					</div>
					<div className="group relative z-0 mb-5 w-full">
						<input
							type="number"
							name="period"
							value={period}
							onChange={(e) => setPeriod(e.target.valueAsNumber < 1 ? 1 : Math.min(e.target.valueAsNumber, 8))}
							className="peer block w-full appearance-none border-0 border-b-2 border-gray-600 bg-transparent px-0 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-0"
							placeholder=" "
							required
						/>
						<label
							htmlFor="period"
							className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">
							What period?<span className="text-red-500"> *</span>
						</label>
					</div>
				</div>
			) : (
				<div className="group relative z-0 mb-5 w-full">
					<input
						type="text"
						name="location"
						value={location}
						onChange={(e) => setLocation(e.target.value)}
						className="peer block w-full appearance-none border-0 border-b-2 border-gray-600 bg-transparent px-0 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-0"
						placeholder=" "
						required
					/>
					<label
						htmlFor="location"
						className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">
						When & where?<span className="text-red-500"> *</span>
					</label>
				</div>
			)}

			<Divider className="my-6" />

			<button
				type="submit"
				className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800 sm:w-auto">
				Submit
			</button>
		</form>
	);
}
