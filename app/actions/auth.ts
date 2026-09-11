"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signInSchema, type SignInInput } from "@/lib/validations/auth";

export async function signInAction(data: SignInInput) {
  // Validate input
  const parsed = signInSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid input data",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const { email, password, rememberMe } = parsed.data;

  try {
    let accessToken = "";
    let refreshToken = "";
    let userData = null;

    // --- MOCK LOGIN LOGIC START ---
    if (email === "admin@gmail.com" && password === "123456") {
      accessToken = "mock-admin-token";
      userData = { id: "1", name: "Mock Admin", email: "admin@gmail.com", role: "ADMIN" };
    } else if (email === "user@gmail.com" && password === "123456") {
      accessToken = "mock-user-token";
      userData = { id: "2", name: "Mock User", email: "user@gmail.com", role: "USER" };
    } else {
      // --- ORIGINAL API CALL (Fallback) ---
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to sign in");
      }

      accessToken = result.data.accessToken;
      refreshToken = result.data.refreshToken;
      // In a real app, you would parse the user data from result.data.user
      userData = { id: "3", name: "API User", email, role: "USER" }; 
    }

    const cookieStore = await cookies();
    const maxAge = rememberMe ? 60 * 60 * 24 * 30 : undefined; // 30 days or session

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge,
    });

    if (userData) {
      const userString = encodeURIComponent(JSON.stringify(userData));
      cookieStore.set("mock_user", userString, {
        httpOnly: false, // Must be false so client-side Context can read it
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge,
      });
    }

    if (refreshToken) {
      cookieStore.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge,
      });
    }

  } catch (error: any) {
    return {
      success: false,
      error: error.message || "An unexpected error occurred. Please try again.",
    };
  }

  // NOTE: In Next.js server actions, you cannot return complex objects if you rely on the client Context.
  // Wait, we can return plain objects.
  return { success: true };
}

export async function signOutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  redirect("/sign-in");
}

export async function forgotPasswordAction(email: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
    const response = await fetch(`${baseUrl}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Failed to send reset link");
    }

    return {
      success: true,
      message: result.message,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "An unexpected error occurred. Please try again.",
    };
  }
}

export async function verifyOtpAction(data: { email: string; code: string }) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
    const response = await fetch(`${baseUrl}/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: data.email, code: data.code }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Invalid OTP code!");
    }

    const { resetToken } = result.data;
    const cookieStore = await cookies();
    
    // Store resetToken in a short-lived cookie (e.g., 15 minutes) for the reset password step
    cookieStore.set("resetToken", resetToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 15 * 60,
    });

    return {
      success: true,
      message: result.message,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "An unexpected error occurred. Please try again.",
    };
  }
}

export async function resendOtpAction(email: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
    const response = await fetch(`${baseUrl}/auth/resend-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, type: "PASSWORD_RESET" }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Failed to resend OTP");
    }

    return {
      success: true,
      message: result.message,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "An unexpected error occurred. Please try again.",
    };
  }
}

export async function resetPasswordAction(password: string) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("resetToken")?.value;

    if (!token) {
      throw new Error("Reset token not found. Please verify your OTP again.");
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
    const response = await fetch(`${baseUrl}/auth/reset-password?token=${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Failed to reset password");
    }

    // Clean up resetToken after success
    cookieStore.delete("resetToken");

    return {
      success: true,
      message: result.message,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "An unexpected error occurred. Please try again.",
    };
  }
}
