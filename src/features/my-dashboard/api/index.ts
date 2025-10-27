import { Invitation } from "@/types/invitation";
import axios from "axios";

interface PostDashboardProps {
  title: string;
  color: string;
}

interface putInvitationsAcceptsProps {
  invitationsId: number;
  inviteAccepted: boolean;
}

export async function getDashboardById({
  dashboardId,
}: {
  dashboardId: number;
}) {
  try {
    const res = await axios.get(`/api/dashboards/${dashboardId}`);
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export interface UpdateDashboardProps extends PostDashboardProps {
  dashboardId: number;
}

export async function updateDashboard({
  title,
  color,
  dashboardId,
}: UpdateDashboardProps) {
  try {
    const res = await axios.put(`/api/dashboards/${dashboardId}`, {
      title,
      color,
    });
    return res;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getDashboards({
  page = 1,
  size = 10,
}: { page?: number; size?: number } = {}) {
  try {
    const res = await axios.get(
      `/api/dashboards?navigationMethod=pagination&page=${page}&size=${size}`
    );
    const body = res.data;
    return body;
  } catch {
    return [];
  }
}

export interface GetInvitationsResponse {
  cursorId: number;
  invitations: Invitation[];
}

export async function getInvitations({
  size = 10,
  cursorId,
}: { size?: number; cursorId?: number } = {}): Promise<GetInvitationsResponse> {
  try {
    const params = new URLSearchParams();
    params.append("size", size.toString());
    if (cursorId) {
      params.append("cursorId", cursorId.toString());
    }

    const res = await axios.get(`/api/invitations?${params}`);
    const body = res.data;
    return body;
  } catch {
    return { cursorId: 0, invitations: [] };
  }
}

export async function getUserInfo() {
  try {
    const res = await axios.get("/api/users/me");
    const body = res.data;
    return body;
  } catch (e) {
    console.error(e);
  }
}

export async function postDashboard({ title, color }: PostDashboardProps) {
  try {
    const res = await axios.post(`/api/dashboards`, {
      title,
      color,
    });
    const body = res.data;
    return body;
  } catch (e) {
    console.error(e);
  }
}

export async function putInvitationsAccepts({
  invitationsId,
  inviteAccepted,
}: putInvitationsAcceptsProps) {
  try {
    const res = await axios.put(`/api/invitations/${invitationsId}`, {
      inviteAccepted,
    });
    const body = res.data;
    return body;
  } catch (e) {
    console.error(e);
  }
}

export async function deleteDashboard(dashboardId: number) {
  try {
    const res = await axios.delete(`/api/dashboards/${dashboardId}`);
    return res;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function inviteUserByEmail({
  email,
  dashboardId,
}: {
  email: string;
  dashboardId: number;
}) {
  try {
    return await axios.post(`/api/dashboards/${dashboardId}/invitations`, {
      email,
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
}
