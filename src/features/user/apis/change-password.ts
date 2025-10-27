import axios from "axios";

interface ChangePasswordRequest {
  password: string;
  newPassword: string;
}

interface ChangePasswordResponse {
  message: string;
}

export async function changePassword(
  body: ChangePasswordRequest
): Promise<ChangePasswordResponse> {
  const response = await axios.put("/api/auth/password", body);
  return response.data;
}
