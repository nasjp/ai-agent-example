import { testClient } from "hono/testing";
import { expect, test } from "vitest";
import { type AppType, app } from "./api";

test("GET /api/hello", async () => {
  const client = testClient<AppType>(app);
  const res = await client.api.hello.$get({
    query: {
      name: "yusuke",
    },
  });
  expect(res.status).toBe(200);

  const data = await res.json();
  expect(data.message).toBe("Hello yusuke!");
});
