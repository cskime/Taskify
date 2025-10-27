import axiosInstance from "@/services/axios-instance";
import { type User } from "@/types/user";
import axios from "axios";
import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

interface LoginResponse {
  accessToken: string;
  user: User;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const response = await axiosInstance.post<LoginResponse>(
      "/auth/login",
      req.body
    );

    if (response.status !== 201) {
      return res.status(response.status).json(response.data);
    }

    const cookie = serialize("accessToken", response.data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });
    res.setHeader("Set-Cookie", cookie);
    return res.status(201).json(response.data.user);
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const { status, data } = error.response;
      return res.status(status).json({
        message: data?.message ?? "Unknown error",
      });
    }
    return res.status(500).json({ message: "Server error" });
  }
}
