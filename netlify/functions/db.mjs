import { getStore } from "@netlify/blobs";

// مفتاح المستند الوحيد الذي يحمل كامل حالة التطبيق
const KEY = "state";

export default async (req) => {
  const store = getStore({ name: "attendance", consistency: "strong" });

  if (req.method === "GET") {
    const data = await store.get(KEY, { type: "json" });
    return Response.json(data ?? null);
  }

  if (req.method === "PUT" || req.method === "POST") {
    const body = await req.json();
    await store.setJSON(KEY, body);
    return new Response(null, { status: 204 });
  }

  return new Response("Method Not Allowed", { status: 405 });
};

export const config = {
  path: "/api/db",
};
