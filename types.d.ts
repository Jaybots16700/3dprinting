import { MongoClient, ObjectId } from "mongodb";
import { DefaultSession } from "next-auth";

declare global {
	// eslint-disable-next-line no-var, vars-on-top
	var mongoClientPromise: Promise<MongoClient>;
}

export type OrderStatus = "received" | "queued" | "printing" | "awaiting payment" | "completed" | "delivered";

export interface InSchoolDelivery {
	school: true;
	period: number;
	room: string;
}

export interface OutOfSchoolDelivery {
	school: false;
	location: string;
}

export type Delivery = InSchoolDelivery | OutOfSchoolDelivery;

export interface PartOrder {
	partName: string;
	user: { name: string; email: string } | User;
	link: string;
	purpose: string;
	other: string;
	timelapse: boolean;
	timestamp: Date;
	filament?: number;
	status: OrderStatus;
	delivery: Delivery;
}

export interface User {
	id: string;
	name: string;
	email: string;
	image: string;
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
