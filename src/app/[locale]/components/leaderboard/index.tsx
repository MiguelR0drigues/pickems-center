type Placement = {
  position: number;
  name: string;
  points: number;
};

const LeaderboardTable = (): JSX.Element => {
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
    <div className="rounded-xl border p-8 w-2/3">
      <table className="w-full ">
        <thead>
          <tr>
            <th className="w-1/6 text-green-400 font-semibold">#</th>
            <th className="w-4/6 text-green-400 font-semibold">Name</th>
            <th className="w-1/6 text-right text-green-400 font-semibold">
              Points
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
    </div>
  );
};

export default LeaderboardTable;
