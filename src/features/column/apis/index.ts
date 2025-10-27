import { Column } from "@/types";

export async function createColumn({
  dashboardId,
  title,
}: {
  dashboardId: number;
  title: string;
}): Promise<Column> {
  const response = await fetch(`/api/columns`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      dashboardId,
    }),
  });

  return response.json();
}

export async function updateColumn({
  columnId,
  title,
}: {
  columnId: number;
  title: string;
}): Promise<Column> {
  const response = await fetch(`/api/columns/${columnId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
    }),
  });

  return response.json();
}

export async function uploadCardImage({
  columnId,
  imageFile,
}: {
  columnId: number;
  imageFile: File;
}): Promise<string> {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch(`/api/columns/${columnId}/card-image`, {
    method: "POST",
    body: formData,
  });

  if (response.status !== 201) {
    return "";
  }

  const data = (await response.json()) as { imageUrl: string };
  return data.imageUrl;
}

export async function deleteColumn({ columnId }: { columnId: number }) {
  await fetch(`/api/columns/${columnId}`, {
    method: "DELETE",
  });
}
