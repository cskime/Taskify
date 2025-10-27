import axios from "axios";

interface ChangePasswordResponse {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export async function changeUserdata(
  nickname: string,
  profileImage: string
): Promise<ChangePasswordResponse> {
  const response = await axios.put("/api/users/me", {
    nickname,
    profileImageUrl: profileImage,
  });
  return response.data;
}
