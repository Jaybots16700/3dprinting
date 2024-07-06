import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
      <Link
        href="/order"
        className="bg-blue-900 text-2xl py-2 px-5 rounded-lg hover:scale-110 duration-150"
      >
        Order!
      </Link>
    </main>
  );
}
