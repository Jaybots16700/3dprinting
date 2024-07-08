"use client";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ChevronDownIcon, UserIcon } from "@heroicons/react/24/solid";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
	const { status, data: session } = useSession();
	const pathname = usePathname();

	return (
		<div className="flex h-16 w-full items-center bg-blue-950 px-5">
			<div className="flex grow items-center space-x-4 text-xl">
				<Link href="https://jaybots.org" className="h-10 w-10">
					<Image src="/images/logo.png" alt="Jaybots logo" className="h-full w-full" width={40} height={40} />
				</Link>
				<Link href="/">3D Printing</Link>
			</div>
			<Link
				type="button"
				className="flex items-center space-x-2 rounded-md px-2 py-1 duration-150 hover:bg-white/5"
				href="/admin">
				Order
			</Link>
			{session && (
				<Link
					type="button"
					className="flex items-center space-x-2 rounded-md px-2 py-1 duration-150 hover:bg-white/5"
					href="/orders">
					Your Orders
				</Link>
			)}
			{session?.user.isAdmin && (
				<Link
					type="button"
					className="flex items-center space-x-2 rounded-md px-2 py-1 duration-150 hover:bg-white/5"
					href="/admin">
					Admin
				</Link>
			)}
			{status === "loading" || !session ? (
				<Link
					type="button"
					className="flex items-center space-x-2 rounded-md px-2 py-1 duration-150 hover:bg-white/5"
					href={`/signin?redirect=${pathname}`}>
					Sign In
				</Link>
			) : (
				<>
					<div className="mx-2 h-10 w-px bg-gray-400" />
					<Popover>
						<PopoverButton className="flex items-center space-x-2 rounded-md px-2 py-1 outline-none duration-150 hover:bg-white/5">
							<div className="h-8 w-8 overflow-hidden rounded-full bg-slate-200 text-gray-800 dark:bg-slate-700 dark:text-gray-300">
								{session.user.image ? (
									<img
										src={session.user.image}
										className="h-full w-full object-cover"
										height={32}
										width={32}
										alt="Profile Picture"
										referrerPolicy="no-referrer"
									/>
								) : (
									<UserIcon className="h-full w-full translate-y-1" />
								)}
							</div>
							<span>{session.user.name ?? session.user.email?.split("@")?.[0] ?? ""}</span>
							<ChevronDownIcon className="h-6 w-6" />
						</PopoverButton>
						<PopoverPanel
							transition
							anchor="bottom end"
							className="absolute w-48 translate-y-1 rounded-xl border border-slate-600 bg-slate-700 transition duration-150 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:translate-y-0 data-[closed]:opacity-0">
							<button type="button" className="w-full p-2 duration-150 hover:bg-slate-600" onClick={() => signOut()}>
								Log Out
							</button>
						</PopoverPanel>
					</Popover>
				</>
			)}
		</div>
	);
}
