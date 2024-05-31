import { User } from "lucide-react";
import AuthContent from "../auth-content";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const AuthPopover = async () => {
  return (
    <Popover>
      <PopoverTrigger className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 p-2 justify-center">
        <User />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-4 text-sm mr-4 sm:mr-10 sm:min-w-[400px]">
        <AuthContent />
      </PopoverContent>
    </Popover>
  );
};

export default AuthPopover;
