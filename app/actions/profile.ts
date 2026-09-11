"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";




export async function getCurrentUser() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://206.162.244.134:5478/api/v1";
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return null;
    }

    const response = await fetch(`${baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 60, tags: ["user-profile"] },
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      return null;
    }

    return result.data;
  } catch (error) {
    return null;
  }
}


export async function updateProfileAction(formData: FormData) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://206.162.244.134:5478/api/v1";
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      throw new Error("Unauthorized: No access token found");
    }

    const response = await fetch(`${baseUrl}/users/update-profile`, {
      method: "PATCH", // Assuming PATCH for update, could be POST/PUT
      headers: {
        Authorization: `Bearer ${token}`,
        // fetch automatically sets the correct Content-Type with boundary for FormData
      },
      body: formData,
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Failed to update profile");
    }

    revalidatePath("/dashboard/settings");

    return { success: true, data: result.data, message: result.message };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
    };
  }
}


export async function updatePasswordAction(data: { oldPassword: string; newPassword: string }) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://206.162.244.134:5478/api/v1";
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      throw new Error("Unauthorized: No access token found");
    }

    const response = await fetch(`${baseUrl}/users/update-password`, {
      method: "PATCH", // Assuming PATCH based on REST conventions, could be POST/PUT
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Failed to update password");
    }

    return { success: true, message: result.message };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
    };
  }
}
