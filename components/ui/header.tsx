import Image from "next/image";
import Link from "next/link";

export default function Header() {
	return (
		<div className="flex h-16 w-full items-center bg-blue-950 px-5">
			<Link href="https://jaybots.org" className="flex h-10 w-10 items-center space-x-4 text-xl">
				<Image src="/images/logo.png" alt="Jaybots logo" className="h-full w-full" width={40} height={40} />
				<span>Jaybots</span>
			</Link>
		</div>
	);
}
