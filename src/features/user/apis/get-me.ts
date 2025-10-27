import axios from "axios";

export interface GetMeResponse {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export async function getMe(): Promise<GetMeResponse> {
  const response = await axios.get("/api/users/me");
  return response.data;
}
