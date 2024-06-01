"use client";
import { useUser } from "@/app/contexts/UserContext";
import { LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { logout } from "../actions";
import UserLoggedIn from "../icons/user-loggedin";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useToast } from "../ui/use-toast";

const LogoutPopover = () => {
  const toaster = useToast();
  const [open, setOpen] = useState(false);
  const t = useTranslations();
  const { user } = useUser();

  const handleLogout = async () => {
    await logout();
    toaster.toast({
      variant: "default",
      title: t("toasts.logout.title"),
      description: t("toasts.logout.description"),
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={"outline"}>
          <UserLoggedIn />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-4 rounded shadow-md flex flex-col items-center gap-4">
        <span className="w-full flex flex-col items-center gap-1">
          <Label className="w-full flex items-center justify-start text-white text-xs">
            {t("components.logoutPopover.user")}
          </Label>
          <Label className="w-full flex items-center justify-start text-green-600">
            {user?.user_metadata.name}
          </Label>
        </span>
        <Button
          variant={"outline"}
          className="w-full flex items-center justify-start gap-2"
          onClick={handleLogout}
        >
          <LogOut className="h-4" />
          {t("components.logoutPopover.button")}
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default LogoutPopover;
