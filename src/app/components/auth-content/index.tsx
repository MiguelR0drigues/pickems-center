"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { login, signup } from "../actions";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const AuthContent = () => {
  const t = useTranslations("components.authForm");
  const [tabValue, setTabValue] = useState("sign-in");

  return (
    <Tabs value={tabValue} onValueChange={setTabValue} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="sign-in">{t("signin.title")}</TabsTrigger>
        <TabsTrigger value="sign-up">{t("signup.title")}</TabsTrigger>
      </TabsList>
      <TabsContent value="sign-in">
        <Card className="mx-auto">
          <CardContent className="mt-3">
            <form>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="si-email">{t("signin.email")}</Label>
                  <Input
                    id="si-email"
                    name="si-email"
                    placeholder={t("signin.emailPlaceholder")}
                    required
                    type="email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="si-password">{t("signin.password")}</Label>
                  <Input
                    id="si-password"
                    name="si-password"
                    required
                    type="password"
                    placeholder={t("signin.passwordPlaceholder")}
                  />
                </div>
                <Button
                  className="w-full bg-green-700 text-white hover:bg-green-900 font-semibold focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  type="submit"
                  formAction={login}
                >
                  {t("signin.button")}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="sign-up">
        <Card className="mx-auto">
          <CardContent className="mt-3">
            <form>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="su-username">{t("signup.name")}</Label>
                  <Input
                    id="su-username"
                    name="su-username"
                    placeholder={t("signup.namePlaceholder")}
                    required
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="su-email">{t("signup.email")}</Label>
                  <Input
                    id="su-email"
                    name="su-email"
                    placeholder={t("signup.emailPlaceholder")}
                    required
                    type="email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="su-password">{t("signup.password")}</Label>
                  <Input
                    id="su-password"
                    name="su-password"
                    required
                    type="password"
                    placeholder={t("signup.passwordPlaceholder")}
                  />
                </div>
                <Button
                  className="w-full bg-green-700 text-white hover:bg-green-900 font-semibold focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  type="submit"
                  formAction={signup}
                >
                  {t("signup.button")}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AuthContent;
