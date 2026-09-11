import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-md">
        <div className="rounded-full bg-muted p-6">
          <FileQuestion className="h-12 w-12 text-muted-foreground" strokeWidth={1.5} />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">404</h1>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground/90">
            Page not found
          </h2>
        </div>
        <p className="text-muted-foreground">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-4">
          <Link href="/">
            <Button>Back to Homepage</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

