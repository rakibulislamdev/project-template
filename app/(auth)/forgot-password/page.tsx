"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import AuthLogo from "../_components/AuthLogo";
import { forgotPasswordAction } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    setIsPending(true);
    try {
      const result = await forgotPasswordAction(email);
      
      if (result.success) {
        toast.success(result.message || "If an account exists, a reset link has been sent to your email.");
        router.push(`/otp?email=${encodeURIComponent(email)}`);
      } else {
        toast.error(result.error);
      }
    } catch (error: any) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-[420px] bg-card rounded-[20px] p-8 md:p-10 shadow-[0px_4px_20px_rgba(0,0,0,0.05)]">
        <AuthLogo />

        {/* Heading Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-1">
            Forgot your password?
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email address & we'll send you a link to reset your password
          </p>
        </div>

        {/* Form Section */}
        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-xs font-semibold text-foreground"
            >
              Email address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 rounded-lg border-border focus-visible:ring-primary"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg flex items-center justify-center gap-2"
          >
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            {isPending ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
      </div>
    </div>
  );
}
