"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { otpSchema, type OtpInput } from "@/lib/validations/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyOtpAction, resendOtpAction } from "@/app/actions/auth";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import AuthLogo from "../../_components/AuthLogo";

export default function OtpForm() {
  const [isPending, setIsPending] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpInput>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data: OtpInput) => {
    if (!email) {
      toast.error("Email not found. Please start the password reset process again.");
      return;
    }

    setIsPending(true);
    try {
      const result = await verifyOtpAction({ email, code: data.otp });

      if (result.success) {
        toast.success(result.message || "OTP verified successfully!");
        router.push("/reset-password");
      } else {
        toast.error(result.error);
      }
    } catch (error: any) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      toast.error("Email not found.");
      return;
    }

    setIsResending(true);
    try {
      const result = await resendOtpAction(email);
      if (result.success) {
        toast.success(result.message || "Verification code resent successfully!");
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <>
      <AuthLogo />

      {/* Heading Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-1">
          Verification
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter the 6-digit code sent to {email ? <span className="font-semibold text-primary">{email}</span> : "your email address"}
        </p>
      </div>

      {/* Form Section */}
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <Controller
            control={control}
            name="otp"
            render={({ field }) => (
              <InputOTP maxLength={6} {...field} className="gap-2 justify-center w-full">
                <InputOTPGroup className="gap-2 w-full justify-center">
                  {[...Array(6)].map((_, i) => (
                    <InputOTPSlot
                      key={i}
                      index={i}
                      className={`h-12 w-12 text-lg rounded-lg border focus-visible:ring-primary ${errors.otp ? "border-destructive focus-visible:ring-destructive" : "border-border"
                        }`}
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            )}
          />
          {errors.otp && (
            <p className="text-[11px] text-destructive text-center mt-1">
              {errors.otp.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isPending || isResending}
          className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg flex items-center justify-center gap-2"
        >
          {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          {isPending ? "Verifying..." : "Verify OTP"}
        </Button>

        <div className="text-center mt-4">
          <p className="text-sm text-muted-foreground">
            Didn't receive a code?{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending || isPending}
              className="text-primary cursor-pointer font-semibold hover:underline disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-1"
            >
              {isResending && <Loader2 className="w-3 h-3 animate-spin" />}
              Resend
            </button>
          </p>
        </div>
      </form>
    </>
  );
}
