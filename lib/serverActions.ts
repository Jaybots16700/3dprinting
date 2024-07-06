"use server";

import { PartOrder } from "@/types";
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

	const { username, partName } = order;

	await fetch(env.DISCORD_WEBHOOK, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			avatar_url: "https://cdn.jaybots.org/logo/transparent.png",
			username: "3D Printing Order",
			embeds: [
				{
					url: `${env.URL}/admin/orders/${id}`,
					title: "New Order",
					description: `${username} placed an order for ${partName}`,
					color: 255,
				},
			],
		}),
	});

	return id;
}
