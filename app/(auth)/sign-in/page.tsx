import SignInHeader from "./_components/SignInHeader";
import SignInForm from "./_components/SignInForm";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-[420px] bg-card rounded-[20px] p-8 md:p-10 shadow-[0px_4px_20px_rgba(0,0,0,0.05)]">
        <SignInHeader />
        <SignInForm />
      </div>
    </div>
  );
}
