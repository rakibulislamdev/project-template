import AuthLogo from "../../_components/AuthLogo";


export default function SignInHeader() {
  return (
    <>
      <AuthLogo />

      {/* Heading Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-1">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground">
          Sign in to your MatPrep admin account
        </p>
      </div>
    </>
  );
}
