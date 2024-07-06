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
