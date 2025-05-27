import Link from "next/link";
import { HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-6 bg-muted dark:bg-background">
      <div className="w-full max-w-lg p-6 bg-background dark:bg-muted border rounded-2xl shadow-sm animate-in fade-in-0 zoom-in-95 duration-500">
        <div className="flex flex-col gap-2 mb-4">
          <h2 className="text-3xl font-extrabold">
            Page Not Found 🔍
          </h2>
          <p className="text-lg font-medium text-muted-foreground">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex justify-end">
          <Link href="/" className="flex items-center gap-2" passHref>
            <Button variant="outline">
              <HomeIcon />
              Return to home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
