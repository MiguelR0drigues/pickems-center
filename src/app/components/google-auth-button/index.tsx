"use client";
import { createClient } from "@/app/utils/supabase/client";
import { useTranslations } from "next-intl";
import GoogleIcon from "../google-icon";
import { Button } from "../ui/button";

const AuthWithGoogle = ({ type }: { type: string }) => {
  const supabase = createClient();
  const t = useTranslations("components.authWithGoogle");

  const handleClick = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.error("Error signing in with Google:", error);
    }
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
