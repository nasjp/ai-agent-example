import { Hono } from "hono";
import { handle } from "hono/vercel";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

export const runtime = "edge";

const helloSchema = z.object({
	name: z.string().min(1),
});

export const app = new Hono()
	.basePath("/api")
	.get("/hello", zValidator("query", helloSchema), (c) => {
		const { name } = c.req.valid("query");
		return c.json({
			message: `Hello ${name}!`,
		});
	});

export type AppType = typeof app;
export const GET = handle(app);
export const POST = handle(app);
