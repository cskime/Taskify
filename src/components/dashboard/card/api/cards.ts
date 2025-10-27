import axios from "axios";

interface CardProps {
  columnId: number;
  size: number;
  cursorId?: number | null;
}

export async function getCards({ columnId, size, cursorId }: CardProps) {
  try {
    const params = new URLSearchParams({
      columnId: columnId.toString(),
    });

    if (size) {
      params.append("size", size.toString());
    }

    if (cursorId !== null && cursorId !== undefined) {
      params.append("cursorId", cursorId.toString());
    }

    const res = await axios.get(`/api/cards?${params.toString()}`);
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
