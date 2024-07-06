import { MongoClient } from "mongodb";
import { DefaultSession } from "next-auth";

declare global {
	// eslint-disable-next-line no-var, vars-on-top
	var mongoClientPromise: Promise<MongoClient>;
}

export type OrderStatus = "received" | "queued" | "printing" | "awaiting payment" | "completed" | "delivered";

export interface PartOrder {
	partName: string;
	username: string;
	email: string;
	link: string;
	purpose: string;
	other?: string;
	timelapse: boolean;
	timestamp: Date;
	filament?: number;
	status: OrderStatus;
}

export interface User {
	id: string;
	name?: string;
	email: string;
	image?: string;
	last_login?: Date;
	isAdmin?: boolean;
}

declare module "next-auth" {
	export interface Session {
		user: {
			id: string;
			isAdmin: boolean;
		} & DefaultSession["user"];
	}
}
