"use server";

import { OrderStatus, PartOrder } from "@/types";
import { connectToDatabase } from "./mongodb";
import { ObjectId } from "mongodb";
import { env } from "@/env";

export async function getAllOrders() {
	const { ordersDb } = await connectToDatabase();

	return ordersDb.find().toArray();
}

export async function getOrder(orderId: string) {
	const { ordersDb } = await connectToDatabase();

	return ordersDb.findOne({ _id: new ObjectId(orderId) });
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
