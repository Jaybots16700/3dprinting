"use client";

import { useSession } from "next-auth/react";

export default function Order({ params }: { params: { orderId: string } }) {
	const { status } = useSession();
}
