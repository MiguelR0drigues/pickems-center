import { ChevronUp, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

const Caption = () => {
  const t = useTranslations("components.caption");

  const colors: { [key: number]: string } = {
    0: "bg-green-500",
    1: "bg-yellow-500",
    2: "bg-red-500",
  };

  const iconToRender: { [key: number]: ReactNode } = {
    0: <ChevronUp />,
    1: (
      <span className="flex items-center justify-center font-bold min-w-[24px]">
        ?
      </span>
    ),
    2: <Plus className="rotate-45" />,
  };
  return (
    <div>
      <ul className="flex gap-6 w-full">
        <li className="flex flex-col sm:flex-row gap-2 items-center text-center w-1/3 sm:w-full">
          <span className={`${colors[0]} rounded max-h-6 max-w-6`}>
            {iconToRender[0]}
          </span>
          <span>{t("through")}</span>
        </li>
        <li className="flex flex-col sm:flex-row gap-2 items-center text-center w-1/3 sm:w-full">
          <span className={`${colors[1]} rounded max-h-6 max-w-6`}>
            {iconToRender[1]}
          </span>
          <span>{t("thirds")}</span>
        </li>
        <li className="flex flex-col sm:flex-row gap-2 items-center text-center w-1/3 sm:w-full">
          <span className={`${colors[2]} rounded max-h-6 max-w-6`}>
            {iconToRender[2]}
          </span>
          <span>{t("eliminated")}</span>
        </li>
      </ul>
    </div>
  );
};

export default Caption;
