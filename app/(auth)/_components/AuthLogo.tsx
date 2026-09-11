import Image from "next/image";

export default function AuthLogo() {
  return (
    <div className="flex flex-col items-center mb-8">
      <Image
        src="/login_page_logo.png"
        alt="MatPrep Logo"
        width={140}
        height={100}
        className="mb-2 h-auto w-auto max-h-[80px]"
      />
      <p className="text-[11px] font-semibold text-muted-foreground tracking-widest uppercase mt-1">
        Admin Panel
      </p>
    </div>
  );
}

