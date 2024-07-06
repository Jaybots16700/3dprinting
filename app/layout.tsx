import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "3D Printing | Jaybots",
	description: "Order a custom part to be 3d Printed Today!",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`min-h-screen bg-zinc-900 ${inter.className}`}>
				<Header />
				{children}
			</body>
		</html>
	);
}
