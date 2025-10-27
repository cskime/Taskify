import axios from "axios";

export async function getColumn({ dashboardId }: { dashboardId: number }) {
  if (!dashboardId) return [];

  try {
    const res = await axios.get(`/api/columns?dashboardId=${dashboardId}`);
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
