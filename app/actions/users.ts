"use server";

import { cookies } from "next/headers";

export async function getUsers(params?: { searchTerm?: string; status?: string; role?: string; page?: number; limit?: number }) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://206.162.244.134:5478/api/v1";
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return { success: false, message: "Unauthorized", data: null };
    }

    const query = new URLSearchParams();
    if (params?.searchTerm !== undefined) query.append("searchTerm", params.searchTerm);
    if (params?.status !== undefined && params.status !== "All") query.append("status", params.status);
    if (params?.role !== undefined) query.append("role", params.role);
    if (params?.page) query.append("page", params.page.toString());
    if (params?.limit) query.append("limit", params.limit.toString());

    const url = `${baseUrl}/users${query.toString() ? `?${query.toString()}` : ""}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const result = await response.json();
    console.log("getUsers response:", result);
    return result;
  } catch (error) {
    console.error("getUsers error:", error);
    return { success: false, message: "An error occurred", data: null };
  }
}

export async function changeUserStatus(userId: string, status: "ACTIVE" | "SUSPENDED" | "INACTIVE") {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://206.162.244.134:5478/api/v1";
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return { success: false, message: "Unauthorized", data: null };
    }

    const response = await fetch(`${baseUrl}/users/change-status/${userId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return { success: false, message: "An error occurred", data: null };
  }
}
