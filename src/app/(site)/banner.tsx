import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

export default function Banner() {
  return (
    <div className="h-[95vh] py-28 flex flex-col items-center justify-center">
      <h1 className="text-8xl font-bold text-center max-w-3xl">
        Cashback <span className="text-primary">finally</span> done right
      </h1>
      <h3 className="text-2xl font-semibold text-center max-w-3xl mt-8">
        Get rewarded for your purchases with just one click, for free.
      </h3>

      <Button className="mt-8 h-14 px-12 text-xl">
        Start saving today <ArrowRightIcon size={20} />
      </Button>
    </div>
  )
}

