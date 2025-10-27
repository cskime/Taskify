import { parse } from "cookie";
import { NextApiRequest } from "next";

export interface Request {
  path?: string;
  method?: string;
  body?: string;
  headers: HeadersInit;
}

export class ProxyClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE || "";
  }

  async send(request: NextApiRequest): Promise<Response> {
    const path = request.url?.replace(/\/api\/?/, "/") ?? "";
    const url = new URL(`${this.baseUrl}${path}`);
    const init: RequestInit = {
      method: request.method,
      body: request.method === "GET" ? undefined : request.body,
      headers: this.headers(request),
    };
    return await fetch(url, init);
  }

  private headers(request: NextApiRequest) {
    const contentType = request.headers["content-type"];
    const isMultipartFormData =
      contentType?.includes("multipart/form-data") ?? false;
    const headers: HeadersInit = {
      "Content-Type":
        isMultipartFormData && contentType ? contentType : "application/json",
    };

    const cookie = request.headers.cookie;
    if (cookie) {
      const accessToken = parse(cookie).accessToken;
      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return headers;
  }
}
