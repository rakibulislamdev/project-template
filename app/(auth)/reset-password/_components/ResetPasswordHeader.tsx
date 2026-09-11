import AuthLogo from "../../_components/AuthLogo";

export default function ResetPasswordHeader() {
  return (
    <>
      <AuthLogo />

      {/* Heading Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-1">
          Create a new password
        </h1>
        <p className="text-sm text-muted-foreground">
          Choose a strong password for your admin account
        </p>
      </div>
    </>
  );
}
