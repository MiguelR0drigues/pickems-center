import { useTranslations } from "next-intl";

type Placement = {
  position: number;
  name: string;
  points: number;
};

type DisabledTableProps = {
  children: React.ReactNode;
};

const DisabledTable = ({ children }: DisabledTableProps): JSX.Element => {
  const t = useTranslations("errors");

  return (
    <div className="relative min-w-full min-h-full">
      <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center">
        <h1 className="text-xl text-green-500">{t("featureNotAvailable")}</h1>
        <h4 className="text-sm mt-4">{t("notStarted")}</h4>
      </span>
      <div className="min-w-full min-h-full blur-md select-none">
        {children}
      </div>
    </div>
  );
};

const LeaderboardTable = (): JSX.Element => {
  const t = useTranslations("LeaderboardScreen");

  const places: Placement[] = [
    { position: 1, name: "FirstName Surname", points: 70 },
    { position: 2, name: "FirstName Surname", points: 69 },
    { position: 3, name: "FirstName Surname", points: 50 },
    { position: 4, name: "FirstName Surname", points: 30 },
    { position: 5, name: "FirstName Surname", points: 20 },
    { position: 6, name: "FirstName Surname", points: 10 },
  ];

  const podiumColor = (position: number): string => {
    if (position === 1) return `yellow-500 text-2xl`;
    if (position === 2) return `neutral-400 text-2xl`;
    if (position === 3) return `amber-600 text-2xl`;
    return "white text-xl";
  };

  const podiumEmoji = (position: number): string | number => {
    if (position === 1) return `🥇`;
    if (position === 2) return `🥈`;
    if (position === 3) return `🥉`;
    return position + ".";
  };

  return (
    <div className="rounded-xl border p-8 w-full sm:w-2/3">
      <DisabledTable>
        <table className="w-full ">
          <thead>
            <tr>
              <th className="w-1/6 text-green-400 font-semibold">#</th>
              <th className="w-4/6 text-green-400 font-semibold">
                {t("table.name")}
              </th>
              <th className="w-1/6 text-right text-green-400 font-semibold">
                {t("table.points")}
              </th>
            </tr>
          </thead>
          <tbody>
            {places.map((place, i) => (
              <tr
                key={place.position}
                className={`${
                  i !== places.length - 1 ? "border-b border-neutral-600" : null
                }`}
              >
                <td
                  className={`text-center ${podiumColor(
                    place.position
                  )} leading-loose`}
                >
                  {podiumEmoji(place.position)}
                </td>
                <td className="text-white">{place.name}</td>
                <td
                  className={`text-right font-bold text-${podiumColor(
                    place.position
                  )}`}
                >
                  {place.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DisabledTable>
    </div>
  );
};

export default LeaderboardTable;
