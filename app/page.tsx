import { ArrowLongRightIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-between p-24">
			<Link
				href="/order"
				className="group flex items-center space-x-1.5 rounded-lg border border-slate-800 py-2 pl-5 pr-4 text-2xl duration-200 hover:border-blue-600/30">
				<span>Order!</span>
				<ArrowLongRightIcon className="size-6 text-blue-600/50 duration-200 group-hover:translate-x-2 group-hover:text-blue-600" />
			</Link>
		</main>
	);
}
