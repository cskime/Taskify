import { Card } from "@/types/card";

export interface CardParams {
  columnId?: number;
  assigneeUserId?: number;
  title: string;
  description: string;
  // dueDate: string;
  tags: string[];
  imageUrl: string;
}

export interface CreateCardParams extends CardParams {
  dashboardId: number;
}

/**
 * 임시 더미 날짜 생성 함수
 * YYYY-MM-DD HH:mm 형식의 문자열 사용
 * Card 생성/수정 시 due date를 입력하는 input을 개발하면 삭제해야 함
 */
const dummyDate = () => {
  const numberWithZeroPadding = (num: number) => String(num).padStart(2, "0");

  const date = new Date();
  const year = date.getFullYear();
  const month = numberWithZeroPadding(date.getMonth() + 1);
  const day = numberWithZeroPadding(date.getDate());
  const hours = numberWithZeroPadding(date.getHours());
  const minutes = numberWithZeroPadding(date.getMinutes());
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export async function getCard({ cardId }: { cardId: number }): Promise<Card> {
  const response = await fetch(`/api/cards/${cardId}`);
  const data = await response.json();
  return data;
}

export async function createCard({
  params,
}: {
  params: CreateCardParams;
}): Promise<Card> {
  const response = await fetch(`/api/cards`, {
    method: "POST",
    body: JSON.stringify({
      ...params,
      dueDate: dummyDate(),
    }),
  });
  const data = await response.json();
  return data;
}

export async function updateCard({
  cardId,
  params,
}: {
  cardId: number;
  params: CardParams;
}): Promise<Card> {
  const response = await fetch(`/api/cards/${cardId}`, {
    method: "PUT",
    body: JSON.stringify({
      ...params,
      dueDate: dummyDate(),
    }),
  });
  const data = await response.json();
  return data;
}

export async function deleteCard({ cardId }: { cardId: number }) {
  const response = await fetch(`/api/cards/${cardId}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
}
