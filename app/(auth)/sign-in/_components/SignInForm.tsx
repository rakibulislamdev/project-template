"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { signInAction } from "@/app/actions/auth";
import { signInSchema, type SignInInput } from "@/lib/validations/auth";

import { useRouter } from "next/navigation";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: SignInInput) => {
    setIsPending(true);
    try {
      const result = await signInAction(data);
      if (result && !result.success) {
        toast.error(result.error);
      } else {
        router.push("/dashboard");
      }
    } catch (error: any) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
          className={`h-11 rounded-lg border-border focus-visible:ring-primary ${errors.email ? 'border-destructive focus-visible:ring-destructive focus-visible:border-destructive' : ''}`}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-[11px] text-destructive mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="password"
          className="text-xs font-semibold text-foreground"
        >
          Password
        </label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className={`h-11 rounded-lg border-border focus-visible:ring-primary pr-10 ${errors.password ? 'border-destructive focus-visible:ring-destructive focus-visible:border-destructive' : ''}`}
            {...register("password")}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-[11px] text-destructive mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between pt-1 pb-2">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            className="w-[18px] h-[18px] rounded-[4px] border-2 border-gray-300 text-primary focus:ring-primary focus:ring-offset-1 appearance-none checked:bg-primary checked:border-primary relative
            before:content-[''] before:absolute before:inset-0 before:bg-[url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22white%22%20stroke-width%3D%223.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%2220%206%209%2017%204%2012%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] before:bg-center before:bg-no-repeat before:bg-[length:12px_12px] before:opacity-0 checked:before:opacity-100 transition-all cursor-pointer group-hover:border-primary/50"
            {...register("rememberMe")}
          />
          <span className="text-sm font-medium text-muted-foreground select-none">
            Remember me
          </span>
        </label>
        <Link
          href="/forgot-password"
          className="text-sm font-semibold text-primary hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg flex items-center justify-center gap-2"
      >
        {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
        {isPending ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}
