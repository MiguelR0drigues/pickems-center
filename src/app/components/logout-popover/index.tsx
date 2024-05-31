"use client";
import { LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { logout } from "../actions";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useToast } from "../ui/use-toast";

const LogoutPopover = ({ email }: { email: string }) => {
  const toaster = useToast();
  const [open, setOpen] = useState(false);
  const t = useTranslations("toasts.logout");

  const handleLogout = async () => {
    await logout();
    toaster.toast({
      variant: "default",
      title: t("title"),
      description: t("description"),
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={"outline"}>{email}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2 rounded shadow-md">
        <Button
          variant={"outline"}
          className="w-full flex items-center justify-start gap-2"
          onClick={handleLogout}
        >
          <LogOut className="h-4" />
          Logout
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default LogoutPopover;
