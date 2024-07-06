import Link from "next/link";

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-between p-24">
			<Link href="/order" className="rounded-lg bg-blue-900 px-5 py-2 text-2xl duration-150 hover:scale-110">
				Order!
			</Link>
		</main>
	);
}
