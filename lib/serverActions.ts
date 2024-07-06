"use server";

import { PartOrder } from "@/types";
import { connectToDatabase } from "./mongodb";
import { ObjectId } from "mongodb";

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

	return ordersDb.insertOne(order).then((o) => o.insertedId.toString());
}
