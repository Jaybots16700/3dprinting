import { pricePerGram } from "@/lib/constants";
import { PartOrder } from "@/types";
import { Container, Head, Heading, Html, Text, Img, Preview, Section } from "@react-email/components";
import * as React from "react";

export default function OrderReceived(order: PartOrder) {
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
			<Preview>Order Received!</Preview>
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
						<Heading style={headingStyles}>Thank you for Ordering!</Heading>
						<Text style={textStyles}>Hello, {order.user.name} </Text>
						<Text style={textStyles}>
							We have received your order for {order.partName} and will get back to you in the next few days with the
							price (${pricePerGram} per gram
							{order?.timelapse ? " + $2 for the timelapse" : ""}) and payment/delivery information. We will reach out
							with any questions about your order.
						</Text>
					</Section>
				</Container>
			</Section>
		</Html>
	);
}
