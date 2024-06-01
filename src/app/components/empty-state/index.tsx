import { SearchX } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const EmptyState = (): JSX.Element => {
  const t = useTranslations("components.emptyState");
  return (
    <Card className="w-2/3 sm:w-[450px] flex flex-col items-center justify-center bg-neutral-700 gap-4 mb-6">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center text-center gap-10">
        <SearchX size={80} absoluteStrokeWidth color="green" />
        <span className="">{t("description")}</span>
      </CardContent>
    </Card>
  );
};
export default EmptyState;
