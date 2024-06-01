"use client";
import { createClient } from "@/app/utils/supabase/client";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import GoogleIcon from "../icons/google";
import { Button } from "../ui/button";

const AuthWithGoogle = ({ type }: { type: string }) => {
  const params = useParams();
  const supabase = createClient();
  const t = useTranslations("components.authWithGoogle");
  const locale = params.locale; // Get the current locale

  const handleClick = () => {
    supabase.auth
      .signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/${locale}/auth/callback`,
        },
      })
      .then(({ error }) => {
        if (error) {
          console.error("Error signing in with Google:", error);
        }
      })
      .catch((error) => {
        console.error("Unexpected error signing in with Google:", error);
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
