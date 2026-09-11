"use server";

import { cookies } from "next/headers";

export async function getSellerRequests() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://206.162.244.134:5478/api/v1";
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return null;
    }

    const response = await fetch(`${baseUrl}/seller/admin/requests`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 }, // Since it's an admin dashboard, we might want fresh data
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      return null;
    }

    return result.data.data;
  } catch (error) {
    return null;
  }
}

export async function reviewSellerRequest(sellerProfileId: string, status: "APPROVED" | "REJECTED", adminNote: string = "") {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://206.162.244.134:5478/api/v1";
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      throw new Error("Unauthorized: No access token found");
    }

    const response = await fetch(`${baseUrl}/seller/admin/requests/${sellerProfileId}/review`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status, adminNote }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Failed to update seller request");
    }

    return { success: true, message: result.message };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
    };
  }
}
