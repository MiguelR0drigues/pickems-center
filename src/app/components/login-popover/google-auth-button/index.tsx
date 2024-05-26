"use client";
import { createClient } from "@/app/utils/supabase/client";
import { useTranslations } from "next-intl";
import { Button } from "../../ui/button";
import GoogleIcon from "../google-icon";

const AuthWithGoogle = ({ type }: { type: string }) => {
  const supabase = createClient();
  const t = useTranslations("components.authWithGoogle");

  const handleClick = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };
  return (
    <Button className="w-full" type="button" onClick={handleClick}>
      {type === "sign-in" ? (
        <span className="flex flex-row gap-2 items-center justify-center">
          <GoogleIcon size={25} />
          <span>{t("signin")}</span>
        </span>
      ) : (
        <span className="flex flex-row gap-2 items-center justify-center">
          <GoogleIcon size={25} />
          <span>{t("signup")}</span>
        </span>
      )}
    </Button>
  );
};

export default AuthWithGoogle;
