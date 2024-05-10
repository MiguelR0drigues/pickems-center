import { Info } from "lucide-react";
import { useTranslations } from "next-intl";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const PointsInfoPopover = () => {
  const t = useTranslations("components.pointsPopOver");
  return (
    <Popover>
      <PopoverTrigger>
        <Info />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-4">
        <section className="flex items-center justify-center font-bold">
          <h1>{t("title")}</h1>
        </section>

        <div
          className="w-full mt-1 mb-1"
          style={{ borderTop: "1px solid rgba(500,500,500,0.5)" }}
        >
          {" "}
        </div>

        <article className="flex flex-col gap-4">
          <h2 className="font-bold">{t("groupStage.title")}</h2>
          <section className="flex flex-row items-center justify-center gap-3">
            <p>{t("groupStage.bullet1")}</p>
            <p className="text-green-500">+24</p>
          </section>
          <section className="flex flex-row items-center justify-center gap-3">
            <p>{t("groupStage.bullet2")}</p>
            <p className="text-green-500">+5</p>
          </section>
          <section className="flex flex-row items-center justify-center gap-3">
            <p>{t("groupStage.bullet3")}</p>
            <p className="text-green-500">+2</p>
          </section>
          <section className="flex flex-row items-center justify-center gap-3">
            <p>{t("groupStage.bullet4")}</p>
            <p className="text-red-500">-3</p>
          </section>
        </article>

        <div
          className="w-full mt-1 mb-1"
          style={{ borderTop: "1px solid rgba(500,500,500,0.5)" }}
        >
          {" "}
        </div>

        <article className="flex flex-col gap-4">
          <h2 className="font-bold">{t("eliminationStage.title")}</h2>
          <section className="flex flex-row items-center justify-between gap-3">
            <p>{t("eliminationStage.bullet1")}</p>
            <p className="text-green-500">+2</p>
          </section>
        </article>
      </PopoverContent>
    </Popover>
  );
};

export default PointsInfoPopover;
