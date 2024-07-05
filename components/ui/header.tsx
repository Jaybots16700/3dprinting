import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="w-full flex h-16 items-center px-5 bg-slate-700">
      <Link
        href="https://jaybots.org"
        className="w-10 flex items-center text-xl space-x-4 h-10"
      >
        <Image
          src="/images/logo.png"
          alt="Jaybots logo"
          className="h-full w-full"
          width={40}
          height={40}
        />
        <span>Jaybots</span>
      </Link>
    </div>
  );
}
