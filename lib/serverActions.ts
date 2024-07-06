"use server";

import { connectToDatabase } from "./mongodb";

export async function getAllOrders() {
	const db = await connectToDatabase();

	return db.ordersDb.find().toArray();
}
