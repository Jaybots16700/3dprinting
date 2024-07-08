"use server";

import { OrderStatus, PartOrder } from "@/types";
import { connectToDatabase } from "./mongodb";
import { ObjectId } from "mongodb";
import { env } from "@/env";
import { Resend } from "resend";
import OrderReceived from "@/components/emails/orderReceived";
import PaymentEmail from "@/components/emails/payment";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import OrderUpdated from "@/components/emails/orderUpdated";
import { redirect } from "next/navigation";

const resend = new Resend(env.RESEND_API_KEY);
const fromEmail = "matthew@matthewglasser.org";

export async function getAllOrders() {
	const { ordersDb } = await connectToDatabase();

	return await ordersDb.find().toArray();
}

export async function getOrder(orderId: string) {
	const { ordersDb } = await connectToDatabase();
	const session = await getServerSession(authOptions);

	if (session?.user.isAdmin) return ordersDb.findOne({ _id: new ObjectId(orderId) });

	return ordersDb.findOne({ _id: new ObjectId(orderId), "user.email": session?.user.email });
}

export async function addOrder(order: PartOrder) {
	const { ordersDb } = await connectToDatabase();

	const id = await ordersDb.insertOne(order).then((o) => o.insertedId.toString());

	const { user, partName } = order;

	await fetch(env.DISCORD_WEBHOOK, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			avatar_url: "https://cdn.jaybots.org/logo/transparent.png",
			username: "3D Printing Order",
			embeds: [
				{
					url: `${env.URL}/admin?open=${id}`,
					title: "New Order",
					description: `${user.name} placed an order for ${partName}`,
					color: 255,
				},
			],
		}),
	});

	await resend.emails.send({
		from: fromEmail,
		to: user.email,
		subject: "Order Received!",
		react: OrderReceived(order, id),
	});

	return id;
}

export async function updateOrder(orderId: string, order: PartOrder) {
	const { ordersDb } = await connectToDatabase();

	const id = (await ordersDb
		.updateOne({ _id: new ObjectId(orderId) }, { $set: order })
		.then((o) => o.upsertedId?.toString())) as string;

	const { user, partName } = order;

	await fetch(env.DISCORD_WEBHOOK, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			avatar_url: "https://cdn.jaybots.org/logo/transparent.png",
			username: "3D Printing Order",
			embeds: [
				{
					url: `${env.URL}/admin?open=${id}`,
					title: "Updated Order",
					description: `${user.name} updated their order for ${partName}`,
					color: 255,
				},
			],
		}),
	});

	await resend.emails.send({
		from: fromEmail,
		to: user.email,
		subject: "Order Updated!",
		react: OrderUpdated(order, id),
	});

	return id;
}

export async function updateStatus(orderId: string, status: OrderStatus) {
	const { ordersDb } = await connectToDatabase();

	ordersDb.updateOne({ _id: new ObjectId(orderId) }, { $set: { status } });
}

export async function updateFilament(orderId: string, filament: number) {
	const { ordersDb } = await connectToDatabase();

	return ordersDb.updateOne({ _id: new ObjectId(orderId) }, { $set: { filament } });
}

export async function sendPaymentEmail(orderId: string) {
	const { ordersDb } = await connectToDatabase();
	const order = await ordersDb.findOne({ _id: new ObjectId(orderId) });

	if (!order?.filament) redirect("/not-found");

	await resend.emails.send({
		from: fromEmail,
		to: order.user.email,
		subject: "Order Processed!",
		react: PaymentEmail(order),
	});
}
