import { env } from "@/env";
import { pricePerGram } from "@/lib/constants";
import { PartOrder } from "@/types";
import { Container, Head, Heading, Html, Text, Img, Preview, Section } from "@react-email/components";
import * as React from "react";

export default function PaymentEmail(order: PartOrder) {
	const logoStyles = {
		display: "block",
		margin: "0 auto",
		marginTop: "0",
	};

	const headingStyles = {
		marginTop: "30px",
		textAlign: "center",
		fontSize: "24px",
		fontWeight: "normal",
		color: "#000",
	} as const;

	const textStyles = {
		fontSize: "14px",
		lineHeight: "24px",
		color: "#000",
	};

	return (
		<Html>
			<Head />
			<Preview>Order Processed!</Preview>
			<Section
				style={{
					margin: "0 auto",
					marginTop: "auto",
					marginBottom: "auto",
					textAlign: "center",
					backgroundColor: "#fff",
					fontFamily: "sans-serif",
				}}>
				<Container
					style={{
						margin: "0 auto",
						marginTop: "40px",
						width: "465px",
						borderRadius: "4px",
						border: "1px solid #eaeaea",
						padding: "20px",
					}}>
					<Section style={{ marginTop: "32px" }}>
						<Img
							src={"https://cdn.jaybots.org/logo/transparent.png"}
							width="40"
							height="37"
							alt="DeAP Logo"
							style={logoStyles}
						/>
					</Section>
					<Section>
						<Heading style={headingStyles}>Order Processed!</Heading>
						<Text style={textStyles}>Hello {order.user.name},</Text>
						<Text style={textStyles}>
							We have processed your order for {order.partName} and comes to a total of $
							{(pricePerGram * (order.filament as number) + (order.timelapse ? 2 : 0)).toFixed(2)} ($
							{pricePerGram} per gram for {order.filament as number} grams
							{order?.timelapse ? " + $2 for the timelapse" : ""})
						</Text>
						<Text style={textStyles}>Payment can be send to {env.PAYPAL_URL}</Text>
					</Section>
				</Container>
			</Section>
		</Html>
	);
}
