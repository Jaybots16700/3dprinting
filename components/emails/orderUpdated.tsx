import { env } from "@/env";
import { pricePerGram } from "@/lib/constants";
import { PartOrder } from "@/types";
import { Container, Head, Heading, Html, Text, Img, Preview, Section, Button } from "@react-email/components";
import * as React from "react";

export default function OrderUpdated(order: PartOrder, id: string) {
	const textStyles = {
		fontSize: "14px",
		lineHeight: "24px",
		color: "#000",
	};

	return (
		<Html>
			<Head />
			<Preview>Order Updated!</Preview>
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
							style={{
								display: "block",
								margin: "0 auto",
								marginTop: "0",
							}}
						/>
					</Section>
					<Section>
						<Heading
							style={{
								marginTop: "30px",
								textAlign: "center",
								fontSize: "24px",
								fontWeight: "normal",
								color: "#000",
							}}>
							Order Updated!
						</Heading>
						<Text style={textStyles}>Hello {order.user.name},</Text>
						<Text style={textStyles}>
							We have received your update for {order.partName} and will get back to you in the next few days with the
							price (${pricePerGram} per gram
							{order.timelapse ? " + $2 for the timelapse" : ""}) and payment/delivery information. We will reach out
							with any questions about your order.
						</Text>
					</Section>

					{!("id" in order.user) && (
						<Button
							href={`${env.URL}/order/${id}`}
							style={{
								padding: "8px 16px 8px 16px",
								background: "#1e40af",
								color: "white",
								cursor: "pointer",
								borderRadius: "6px",
							}}>
							View your order!
						</Button>
					)}
				</Container>
			</Section>
		</Html>
	);
}
