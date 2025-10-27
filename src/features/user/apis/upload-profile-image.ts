import axios from "axios";

interface UploadProfileImageResponse {
  profileImageUrl: string;
}

export async function uploadProfileImage(file: File) {
  const form = new FormData();
  form.append("image", file);
  const { data } = await axios.post<UploadProfileImageResponse>(
    "/api/users/me/image",
    form,
    { headers: { "Content-Type": "multipart/form-data" } }
  );

  return data.profileImageUrl;
}
