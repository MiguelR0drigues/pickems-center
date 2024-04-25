import LeaderboardTable from "../../components/leaderboard";
import PointsInfoPopover from "../../components/points-info-popover";

const Leaderboard = (): JSX.Element => {
  // const t = useTranslations("Index");
  return (
    <section className="flex flex-col gap-4 items-center w-full text-white h-full">
      <div className="flex flex-row items-center justify-center mb-8 gap-8">
        <h1 className=" text-6xl text-green-400">General Leaderboard</h1>
        <PointsInfoPopover />
      </div>
      <LeaderboardTable />
    </section>
  );
};

export default Leaderboard;
