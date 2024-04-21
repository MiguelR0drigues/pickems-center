import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ButtonLoading({
  label,
  customStyling,
  variant = "secondary",
}: {
  label: string;
  customStyling: string;
  variant:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost";
}) {
  return (
    <Button
      disabled
      className={customStyling ? customStyling : "bg-green-500 w-1/3 h-16"}
      variant={variant}
    >
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      {label}
    </Button>
  );
}
