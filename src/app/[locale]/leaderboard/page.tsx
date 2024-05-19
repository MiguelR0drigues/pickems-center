import LeaderboardTable from "@/app/components/leaderboard";
import PointsInfoPopover from "@/app/components/points-info-popover";
import { useTranslations } from "next-intl";

export default function Leaderboard(): JSX.Element {
  const t = useTranslations("LeaderboardScreen");
  return (
    <section className="flex flex-col gap-4 items-center w-full text-white h-full">
      <div className="flex flex-row items-center justify-center mb-8 gap-8 mt-4">
        <h1 className="text-2xl sm:text-6xl text-green-400">{t("title")}</h1>
        <PointsInfoPopover />
      </div>
      <LeaderboardTable />
    </section>
  );
}
