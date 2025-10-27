import { ProxyClient } from "@/services/proxy-client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = new ProxyClient();
    const response = await client.send(req);
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    const response = res.status(500);
    return response.json({
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
}
