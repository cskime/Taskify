import { Comment } from "@/types";

interface GetCommentsResponse {
  cursorId: number;
  comments: Comment[];
}

export async function getComments(params: {
  cardId: number;
  cursorId?: number;
}): Promise<GetCommentsResponse> {
  const searchParams = new URLSearchParams();
  searchParams.append("cardId", params.cardId.toString());
  if (params.cursorId) {
    searchParams.append("cursorId", params.cursorId.toString());
  }
  const response = await fetch(`/api/comments?${searchParams}`);
  return response.json();
}

export async function createComment({
  params,
}: {
  params: {
    cardId: number;
    columnId: number;
    dashboardId: number;
    content: string;
  };
}) {
  const response = await fetch(`/api/comments`, {
    method: "POST",
    body: JSON.stringify(params),
  });
  const data = await response.json();
  return data;
}
