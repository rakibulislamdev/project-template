import AuthLogo from "../_components/AuthLogo";
import { ResetSuccessIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ResetSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-[420px] bg-card rounded-[20px] p-8 md:p-10 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] flex flex-col items-center text-center">
        <AuthLogo />

        {/* Success Icon */}
        <div className="mb-6">
          <ResetSuccessIcon className="w-16 h-16 text-primary" />
        </div>

        {/* Heading Section */}
        <div className="mb-8">
          <h1 className="text-xl font-bold text-foreground mb-2">
            Password Reset Successfully
          </h1>
          <p className="text-xs text-muted-foreground leading-relaxed px-4">
            Your password has been updated. You can now sign in with your new password.
          </p>
        </div>

        {/* Button */}
        <Button render={<Link href="/sign-in" />} className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg">
          Back to Sign In
        </Button>
      </div>
    </div>
  );
}
