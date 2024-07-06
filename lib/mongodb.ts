import { type Db, MongoClient } from "mongodb";
import { env } from "@/env";
import { PartOrder, User } from "@/types";

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export const clientPromise =
	env.NODE_ENV === "development" && globalThis.mongoClientPromise
		? globalThis.mongoClientPromise
		: new MongoClient(env.MONGODB_URI, {}).connect();

if (env.NODE_ENV === "development" && !globalThis.mongoClientPromise) globalThis.mongoClientPromise = clientPromise;

export async function connectToDatabase(dbName: string = "3dprinting") {
	const client = await clientPromise;
	const db = client.db(dbName) as Db;

	return {
		client,
		db,
		ordersDb: db.collection<PartOrder>("orders"),
		usersDb: db.collection<User>("users"),
	};
}
