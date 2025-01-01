"use client";
import { hc } from "hono/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { AppType } from "./api/[[...route]]/route";
import { useState } from "react";

const client = hc<AppType>("/");

export default function Home() {
	const [message, setMessage] = useState("");

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<Button
				onClick={async () => {
					const res = await client.api.hello.$get({
						query: {
							name: "yusuke",
						},
					});
					const data = await res.json();
					setMessage(data.message);
				}}
			>
				Click me
			</Button>
			<Card>
				<CardHeader>
					<CardTitle>Message</CardTitle>
				</CardHeader>
				<CardContent>
					<p>{message}</p>
				</CardContent>
			</Card>
		</div>
	);
}
