import { OrderStatus } from "@/types";

export const pricePerGram = 0.05 as const;

export const badgeStyles = {
	received: " bg-blue-900 text-blue-300",
	queued: " bg-red-900 text-red-300",
	printing: " bg-purple-900 text-purple-300",
	delivered: " bg-green-900 text-green-300",
	completed: " bg-yellow-900 text-yellow-300",
	"awaiting payment": " bg-orange-900 text-orange-300",
} satisfies { [key in OrderStatus]: string };
