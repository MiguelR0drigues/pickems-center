"use client";
import { useTranslations } from "next-intl";
import { ChangeEvent, useState } from "react";
import { login, signup } from "../actions";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

type FormContent = {
  username: string | undefined;
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
};

const formInitialData = {
  username: undefined,
  name: undefined,
  email: undefined,
  password: undefined,
};

const AuthContent = () => {
  const t = useTranslations("components.authForm");
  const [tabValue, setTabValue] = useState("sign-in");
  const [signUpValues, setSignUpValues] =
    useState<FormContent>(formInitialData);
  const [errors, setErrors] = useState<FormContent>(formInitialData);

  const handleSignupUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    if (value.length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: undefined,
      }));

      setSignUpValues((prevValues) => ({
        ...prevValues,
        username: undefined,
      }));
      return;
    }
    const usernameRegex = /^[a-zA-Z0-9]+(?:[.-]?[a-zA-Z0-9]+)*$/;
    const isValidUsername = usernameRegex.test(value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      username: isValidUsername ? undefined : "username",
    }));

    setSignUpValues((prevValues) => ({
      ...prevValues,
      username: isValidUsername ? value : undefined,
    }));
  };

  const handleSignupNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    if (value.length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: undefined,
      }));

      setSignUpValues((prevValues) => ({
        ...prevValues,
        name: undefined,
      }));
      return;
    }
    const nameRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
    const isValidName = nameRegex.test(value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      name: isValidName ? undefined : "name",
    }));

    setSignUpValues((prevValues) => ({
      ...prevValues,
      name: isValidName ? value : undefined,
    }));
  };

  const handleSignupEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    if (value.length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: undefined,
      }));

      setSignUpValues((prevValues) => ({
        ...prevValues,
        email: undefined,
      }));
      return;
    }
    setSignUpValues((prevValues) => ({
      ...prevValues,
      email: value,
    }));
  };

  const handleSignupPwChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;

    if (value.length === 0) {
      setSignUpValues((prev: any) => {
        return { ...prev, password: undefined };
      });
      setErrors((prev: any) => {
        return { ...prev, password: undefined };
      });
      return;
    }
    const minLength = 6;
    const hasCapital = /[A-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);

    if (value.length <= minLength)
      return setErrors((prev: any) => {
        return { ...prev, password: "minLength" };
      });
    if (!hasCapital)
      return setErrors((prev: any) => {
        return { ...prev, password: "capitalLetters" };
      });
    if (!hasNumber)
      return setErrors((prev: any) => {
        return { ...prev, password: "noNumbers" };
      });

    setErrors((prev: any) => {
      return { ...prev, password: undefined };
    });
    setSignUpValues((prev: any) => {
      return { ...prev, password: value };
    });
  };

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
                    type="email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="si-password">{t("signin.password")}</Label>
                  <Input
                    id="si-password"
                    name="si-password"
                    type="password"
                    placeholder={t("signin.passwordPlaceholder")}
                    required
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
                  <Label htmlFor="su-username">{t("signup.username")}</Label>
                  <Input
                    id="su-username"
                    name="su-username"
                    value={signUpValues.username}
                    onChange={(e) => handleSignupUsernameChange(e)}
                    placeholder={t("signup.usernamePlaceholder")}
                    type="text"
                    required
                  />
                  {errors?.username && (
                    <Label className="text-xs text-red-500">
                      {t(`errors.${errors.username}`)}
                    </Label>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="su-name">{t("signup.name")}</Label>
                  <Input
                    id="su-name"
                    name="su-name"
                    value={signUpValues.name}
                    onChange={(e) => handleSignupNameChange(e)}
                    placeholder={t("signup.namePlaceholder")}
                    type="text"
                    required
                  />
                  {errors?.name && (
                    <Label className="text-xs text-red-500">
                      {t(`errors.${errors.name}`)}
                    </Label>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="su-email">{t("signup.email")}</Label>
                  <Input
                    id="su-email"
                    name="su-email"
                    value={signUpValues.email}
                    onChange={(e) => handleSignupEmailChange(e)}
                    placeholder={t("signup.emailPlaceholder")}
                    type="email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="su-password">{t("signup.password")}</Label>
                  <Input
                    id="su-password"
                    name="su-password"
                    type="password"
                    value={signUpValues?.password}
                    onChange={(e) => handleSignupPwChange(e)}
                    placeholder={t("signup.passwordPlaceholder")}
                    required
                  />
                  {errors?.password && (
                    <Label className="text-xs text-red-500">
                      {t(`errors.${errors.password}`)}
                    </Label>
                  )}
                </div>
                <Button
                  className="w-full bg-green-700 text-white hover:bg-green-900 font-semibold focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  type="submit"
                  formAction={signup}
                  disabled={
                    Object.values(signUpValues).some((value) => !value) ||
                    Object.values(errors).some((error) => error)
                  }
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
