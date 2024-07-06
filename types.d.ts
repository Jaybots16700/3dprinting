import { MongoClient } from "mongodb";

declare global {
	// eslint-disable-next-line no-var, vars-on-top
	var mongoClientPromise: Promise<MongoClient>;
}

export interface PartOrder {
	firstName: string;
	lastName: string;
	email: string;
	link: string;
	purpose: string;
	other?: string;
	timelapse: boolean;
	timestamp: Date;
	filament?: number;
	status: "received" | "queued" | "printing" | "awaiting payment" | "completed" | "delivered";
}
