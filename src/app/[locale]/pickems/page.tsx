"use client";
import AuthContent from "@/app/components/auth-content";
import Caption from "@/app/components/caption";
import EmptyState from "@/app/components/empty-state";
import { Group } from "@/app/components/group";
import PointsInfoPopover from "@/app/components/points-info-popover";
import PickemsSkeleton from "@/app/components/skeletons/pickems";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { useToast } from "@/app/components/ui/use-toast";
import { useUser } from "@/app/contexts/UserContext";
import { GroupData, GroupItem } from "@/app/types";
import jwt from "jsonwebtoken";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

const Pickems = (): JSX.Element => {
  const { user } = useUser();
  const toaster = useToast();
  const t = useTranslations();

  const defaultUser = process.env.NEXT_PUBLIC_DEFAULT_USER_ID;
  const jwtToken = process.env.NEXT_PUBLIC_JWT_SECRET;

  const [currentGroups, setCurrentGroups] = useState<GroupData>({});
  const [showAuthDialog, setShowAuthDialog] = useState<boolean>(false);
  const [showThirdsDialog, setShowThirdsDialog] = useState<boolean>(false);
  const [showSkeleton, setShowSkeleton] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [thirdPlaces, setThirdPlaces] = useState<GroupData>({});

  // groups || playoffs
  const [tabValue, setTabValue] = useState<string>("groups");

  // 16 || 8 || 4 || 2
  const [playoffsTabs, setPlayoffsTabs] = useState<string>("16");

  const [teamsToGoThrough, setTeamsToGoThrough] = useState({
    16: {},
    8: {},
    4: {},
    2: {},
  });
  const [runnerUps, setRunnerUps] = useState({
    16: {},
    8: {},
    4: {},
    2: {},
  });

  const token = jwt.sign({}, jwtToken!, {
    algorithm: "HS256",
  });

  useEffect(() => {
    if (!user) setShowAuthDialog(true);
    fetch(
      `https://zpafftlifxzqrzuafugi.supabase.co/functions/v1/getGroupsScores?userUUID=${
        user?.id || defaultUser
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setShowSkeleton(false);
        setCurrentGroups(res.groups);
        setThirdPlaces({ thirdsToAdvance: res.thirdsToAdvance });
      })
      .catch(() => {
        setShowSkeleton(false);
        toaster.toast({
          variant: "destructive",
          title: t("toasts.pickems.fetchError.title"),
          description: t("toasts.pickems.fetchError.description"),
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const updateCurrentGroups = (newGroup: GroupData) => {
    setCurrentGroups((prev) => {
      const updatedGroups = { ...prev, ...newGroup };
      const newThirdPlaces = getThirdCountries(updatedGroups);

      setThirdPlaces({ thirdsToAdvance: newThirdPlaces });

      return updatedGroups;
    });
  };

  const updateThirdsGroups = (newGroup: GroupData) => {
    setThirdPlaces((prev) => {
      return { ...prev, ...newGroup };
    });
  };

  const getThirdCountries = (currentGroups: GroupData): GroupItem[] => {
    const thirdCountries: GroupItem[] = [];

    Object.entries(currentGroups).forEach(([groupName, countries]) => {
      const sortedCountries = countries.sort(
        (a: GroupItem, b: GroupItem) => b.points - a.points
      );

      if (sortedCountries.length >= 3) {
        const thirdCountry = sortedCountries[2];
        thirdCountries.push(thirdCountry);
      }
    });

    return thirdCountries;
  };

  const updateOrderValues = (currentGroups: GroupData): GroupData => {
    const updatedGroups: GroupData = {};
    Object.entries(currentGroups).forEach(([groupName, countries]) => {
      const updatedCountries = countries.map((country, index) => ({
        ...country,
        order: index + 1,
      }));
      updatedGroups[groupName] = updatedCountries;
    });

    return updatedGroups;
  };

  const handleSubmit = () => {
    if (!user) return setShowAuthDialog(true);
    setShowThirdsDialog(true);
  };

  const handlePlayoffGameClick = () => {
    const winnersRound16 = teamsToGoThrough[16];
    const winnersRound8 = teamsToGoThrough[8];
    const winnersRound4 = teamsToGoThrough[4];

    const runnersFor8 = Object.entries(winnersRound16).map(
      ([teamCode, team]) => {
        const game = Math.floor(((team as any).game - 1) / 2) + 1;
        return { [teamCode]: { ...(team as any), game: game } };
      }
    );

    const runnersFor4 = Object.entries(winnersRound8).map(
      ([teamCode, team]) => {
        const game = Math.floor(((team as any).game - 1) / 2) + 1;
        return { [teamCode]: { ...(team as any), game: game } };
      }
    );

    console.log(winnersRound4);

    const runnersForSemis = Object.entries(winnersRound4).map(
      ([teamCode, team]) => {
        const game = Math.floor(((team as any).game - 1) / 2) + 1;
        return { [teamCode]: { ...(team as any), game: game } };
      }
    );

    console.log(runnersForSemis);

    const flattened8 = Object.values(runnersFor8).reduce((acc, curr) => {
      return { ...acc, ...curr };
    }, {});

    const flattened4 = Object.values(runnersFor4).reduce((acc, curr) => {
      return { ...acc, ...curr };
    }, {});

    const flattened2 = Object.values(runnersForSemis).reduce((acc, curr) => {
      return { ...acc, ...curr };
    }, {});

    setRunnerUps((prev: any) => {
      return { ...prev, 8: flattened8, 4: flattened4, 2: flattened2 };
    });

    setTeamsToGoThrough((prev: any) => {
      return { ...prev, 8: flattened8, 4: flattened4, 2: flattened2 };
    });
  };

  const handleComplete = () => {
    setShowThirdsDialog(false);
    setLoading(true);
    fetch(
      `https://zpafftlifxzqrzuafugi.supabase.co/functions/v1/updateGroupsScores`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userUUID: user?.id,
          groups: updateOrderValues(currentGroups),
          thirdsToAdvance: thirdPlaces.thirdsToAdvance.splice(0, 4),
        }),
      }
    )
      .then((res) => res.json())
      .then(() => {
        setLoading(false);
        toaster.toast({
          variant: "default",
          title: t("toasts.pickems.updateSuccess.title"),
          description: t("toasts.pickems.updateSuccess.description"),
        });
      })
      .catch(() => {
        setLoading(false);
        toaster.toast({
          variant: "destructive",
          title: t("toasts.pickems.updateError.title"),
          description: t("toasts.pickems.updateError.description"),
        });
      });
  };

  const updateTeamsToGoThrough = (team: Team, round: number) => {
    setTeamsToGoThrough((prev: any) => {
      // Check if there is already a team with the same game
      const hasOpponent = Object.values(prev[round] || {}).find(
        //@ts-ignore
        (t: Team) => t.game === team.game && t.name !== team.name
      );

      console.log("Selected team> ", team);
      console.log("Current Round> ", round);
      console.log("Opponent> ", hasOpponent);

      if (hasOpponent) {
        // Remove the previous team with the same game, if exists
        const updated = {
          ...prev,
          [round]: Object.fromEntries(
            Object.entries(prev[round]).filter(
              //@ts-ignore
              ([_, t]: [string, Team]) => t.game !== team.game
            )
          ),
        };

        // Add the new team to the updated state
        updated[round][team.code] = team;

        // Sort the updated round state by game number
        updated[round] = Object.fromEntries(
          Object.entries(updated[round]).sort(
            //@ts-ignore
            ([, a]: [string, Team], [, b]: [string, Team]) => a.game - b.game
          )
        );
        return updated;
      }

      // No team with the same game found, simply update the state
      const updated = {
        ...prev,
        [round]: {
          ...prev[round],
          [team.code]: team,
        },
      };

      // Sort the updated round state by game number
      updated[round] = Object.fromEntries(
        Object.entries(updated[round]).sort(
          //@ts-ignore
          ([, a]: [string, Team], [, b]: [string, Team]) => a.game - b.game
        )
      );
      return updated;
    });
  };

  // Function to get teams for a specific round and game
  const getTeamsForRoundAndGame = (
    round: number,
    game1: number,
    game2: number
  ): Team[] => {
    const roundTeams = (runnerUps as any)[round];
    const teams: any = Object.values(roundTeams).filter(
      (team: any) => team.game === game1 || team.game === game2
    );
    return [teams[0], teams[1]];
  };
  console.log("RUNNER UPS -> ", runnerUps);
  console.log("TEAMS TO GO THROUGH TO THE NEXT STAGE -> ", teamsToGoThrough);

  return (
    <div className="flex flex-col gap-10 items-center w-full h-100%">
      <div className="flex flex-row gap-6 mt-3 sm:mt-0">
        <div className="text-6xl text-green-500">
          {t("PickemsScreen.title")}
        </div>
        <PointsInfoPopover />
      </div>
      <Tabs
        value={tabValue}
        onValueChange={setTabValue}
        className="w-full flex flex-col items-center justify-center"
      >
        <TabsList className="grid w-full sm:w-1/2 grid-cols-2">
          <TabsTrigger
            value="groups"
            className="data-[state=active]:bg-green-500 data-[state=active]:text-black text-white"
          >
            {t("PickemsScreen.tabs.groups")}
          </TabsTrigger>
          <TabsTrigger
            value="playoffs"
            className="data-[state=active]:bg-green-500 data-[state=active]:text-black text-white"
          >
            {t("PickemsScreen.tabs.playoffs")}
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="groups"
          className="w-full flex flex-col items-center justify-center"
        >
          <Caption styles="mt-8 mb-8" />

          {showSkeleton ? (
            <PickemsSkeleton />
          ) : currentGroups && Object.values(currentGroups).length > 0 ? (
            <>
              <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
                <div className="flex flex-wrap flex-row gap-8 justify-center items-center w-full overflow-hidden">
                  {Object.entries(currentGroups).map((group, index) => (
                    <Group
                      key={index}
                      id={`pickems-group-${index}`}
                      groupName={group[0]}
                      groupsData={group[1]}
                      updateCurrentGroups={updateCurrentGroups}
                    />
                  ))}
                </div>
              </DndProvider>
              <Button
                className="bg-green-500 min-w-[270px] h-16 hover:bg-green-950 cursor-not-allowed select-none mt-8"
                variant="secondary"
                onClick={handleSubmit}
                disabled
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  t("PickemsScreen.button")
                )}
              </Button>
              <Dialog
                open={showAuthDialog}
                onOpenChange={() => setShowAuthDialog(!showAuthDialog)}
              >
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader></DialogHeader>
                  <AuthContent />
                </DialogContent>
              </Dialog>
              <Dialog
                open={showThirdsDialog}
                onOpenChange={() => setShowThirdsDialog(false)}
              >
                <DialogContent className="sm:max-w-[425px] sm:max-h-[550px] flex flex-col items-center">
                  <DialogHeader>
                    <DialogTitle>
                      {t("PickemsScreen.thirdsDialogTitle")}
                    </DialogTitle>
                  </DialogHeader>
                  <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
                    <Group
                      id={`pickems-group-thirds`}
                      groupName={"thirdsToAdvance"}
                      groupsData={thirdPlaces.thirdsToAdvance}
                      updateCurrentGroups={updateThirdsGroups}
                      isThirds
                    />
                  </DndProvider>
                  <Button
                    className="bg-green-500 min-w-[270px] h-16 hover:bg-green-950"
                    variant="secondary"
                    onClick={handleComplete}
                  >
                    {t("PickemsScreen.button")}
                  </Button>
                </DialogContent>
              </Dialog>
            </>
          ) : (
            <EmptyState />
          )}
        </TabsContent>
        <TabsContent value="playoffs" className="w-full">
          <Tabs
            value={playoffsTabs}
            onValueChange={setPlayoffsTabs}
            className="w-full flex flex-col items-center justify-center"
          >
            <TabsList className="grid w-full sm:w-1/2 grid-cols-4 mb-4">
              <TabsTrigger
                value="16"
                className="data-[state=active]:bg-green-500 data-[state=active]:text-black text-white"
              >
                {t("PickemsScreen.tabs.16")}
              </TabsTrigger>
              <TabsTrigger
                value="8"
                className="data-[state=active]:bg-green-500 data-[state=active]:text-black text-white"
              >
                {t("PickemsScreen.tabs.8")}
              </TabsTrigger>
              <TabsTrigger
                value="4"
                className="data-[state=active]:bg-green-500 data-[state=active]:text-black text-white"
              >
                {t("PickemsScreen.tabs.4")}
              </TabsTrigger>
              <TabsTrigger
                value="2"
                className="data-[state=active]:bg-green-500 data-[state=active]:text-black text-white"
              >
                {t("PickemsScreen.tabs.2")}
              </TabsTrigger>
            </TabsList>
            <p className="font-bold text-2xl text-yellow-500">
              🚧 {t("errors.featureNotFinished")} 🚧
            </p>
            <TabsContent
              value="16"
              className="w-full flex flex-col items-center justify-center gap-4"
            >
              <>
                <div className=" flex flex-col sm:flex-row gap-8 ">
                  <div className="w-full sm:w-1/2 flex flex-col items-center justify-center gap-3">
                    <PlayoffCard
                      key={"round16-game1"}
                      team1={{ game: 1, code: "es", name: "spain" }}
                      team2={{ game: 1, code: "ge", name: "georgia" }}
                      stateToUpdate={teamsToGoThrough[16]}
                      updateState={updateTeamsToGoThrough}
                      round={16}
                    />
                    <PlayoffCard
                      key={"round16-game2"}
                      team1={{ game: 2, code: "de", name: "germany" }}
                      team2={{ game: 2, code: "dk", name: "denmark" }}
                      stateToUpdate={teamsToGoThrough[16]}
                      updateState={updateTeamsToGoThrough}
                      round={16}
                    />
                    <PlayoffCard
                      key={"round16-game3"}
                      team1={{ game: 3, code: "pt", name: "portugal" }}
                      team2={{ game: 3, code: "si", name: "slovenia" }}
                      stateToUpdate={teamsToGoThrough[16]}
                      updateState={updateTeamsToGoThrough}
                      round={16}
                    />
                    <PlayoffCard
                      key={"round16-game4"}
                      team1={{ game: 4, code: "fr", name: "france" }}
                      team2={{ game: 4, code: "be", name: "belgium" }}
                      stateToUpdate={teamsToGoThrough[16]}
                      updateState={updateTeamsToGoThrough}
                      round={16}
                    />
                  </div>
                  <div className="w-full sm:w-1/2 flex flex-col items-center justify-center gap-3">
                    <PlayoffCard
                      key={"round16-game5"}
                      team1={{ game: 5, code: "ro", name: "romania" }}
                      team2={{ game: 5, code: "nl", name: "netherlands" }}
                      stateToUpdate={teamsToGoThrough[16]}
                      updateState={updateTeamsToGoThrough}
                      round={16}
                    />
                    <PlayoffCard
                      key={"round16-game6"}
                      team1={{ game: 6, code: "at", name: "austria" }}
                      team2={{ game: 6, code: "tr", name: "turkey" }}
                      stateToUpdate={teamsToGoThrough[16]}
                      updateState={updateTeamsToGoThrough}
                      round={16}
                    />
                    <PlayoffCard
                      key={"round16-game7"}
                      team1={{ game: 7, code: "gb-eng", name: "england" }}
                      team2={{ game: 7, code: "sk", name: "slovakia" }}
                      stateToUpdate={teamsToGoThrough[16]}
                      updateState={updateTeamsToGoThrough}
                      round={16}
                    />
                    <PlayoffCard
                      key={"round16-game8"}
                      team1={{ game: 8, code: "ch", name: "switzerland" }}
                      team2={{ game: 8, code: "it", name: "italy" }}
                      stateToUpdate={teamsToGoThrough[16]}
                      updateState={updateTeamsToGoThrough}
                      round={16}
                    />
                  </div>
                </div>
                <Button
                  className="bg-green-500 min-w-[270px] h-16 hover:bg-green-950"
                  variant="secondary"
                  onClick={() => {
                    setPlayoffsTabs((prev) => `${Number(prev) / 2}`);
                    handlePlayoffGameClick();
                  }}
                >
                  Confirm
                </Button>
              </>
            </TabsContent>
            <TabsContent
              value="8"
              className="w-full flex flex-col items-center justify-center gap-4"
            >
              {Object.entries(runnerUps[8]).length > 0 ? (
                <>
                  <div className=" flex flex-col sm:flex-row gap-8 ">
                    <div className="w-full sm:w-1/2 flex flex-col items-center justify-center gap-3">
                      <PlayoffCard
                        key={"round8-game1"}
                        team1={getTeamsForRoundAndGame(8, 1, 1)[0]}
                        team2={getTeamsForRoundAndGame(8, 1, 1)[1]}
                        stateToUpdate={runnerUps[8]}
                        updateState={updateTeamsToGoThrough}
                        round={8}
                      />
                      <PlayoffCard
                        key={"round8-game2"}
                        team1={getTeamsForRoundAndGame(8, 2, 2)[0]}
                        team2={getTeamsForRoundAndGame(8, 2, 2)[1]}
                        stateToUpdate={runnerUps[8]}
                        updateState={updateTeamsToGoThrough}
                        round={8}
                      />
                    </div>
                    <div className="w-full sm:w-1/2 flex flex-col items-center justify-center gap-3">
                      <PlayoffCard
                        key={"round8-game3"}
                        team1={getTeamsForRoundAndGame(8, 3, 3)[0]}
                        team2={getTeamsForRoundAndGame(8, 3, 3)[1]}
                        stateToUpdate={runnerUps[8]}
                        updateState={updateTeamsToGoThrough}
                        round={8}
                      />
                      <PlayoffCard
                        key={"round8-game4"}
                        team1={getTeamsForRoundAndGame(8, 4, 4)[0]}
                        team2={getTeamsForRoundAndGame(8, 4, 4)[1]}
                        stateToUpdate={runnerUps[8]}
                        updateState={updateTeamsToGoThrough}
                        round={8}
                      />
                    </div>
                  </div>
                  <Button
                    className="bg-green-500 min-w-[270px] h-16 hover:bg-green-950"
                    variant="secondary"
                    onClick={() => {
                      setPlayoffsTabs((prev) => `${Number(prev) / 2}`);
                      handlePlayoffGameClick();
                    }}
                  >
                    Confirm
                  </Button>
                </>
              ) : null}
            </TabsContent>
            <TabsContent
              value="4"
              className="w-full flex flex-col items-center justify-center gap-4"
            >
              {Object.entries(runnerUps[4]).length > 0 ? (
                <>
                  <div className=" flex flex-col sm:flex-row gap-8 ">
                    <div className="w-full sm:w-1/2 flex flex-col items-center justify-center gap-3">
                      <PlayoffCard
                        key={"round4-game1"}
                        team1={getTeamsForRoundAndGame(4, 1, 1)[0]}
                        team2={getTeamsForRoundAndGame(4, 1, 1)[1]}
                        stateToUpdate={runnerUps[4]}
                        updateState={updateTeamsToGoThrough}
                        round={4}
                      />
                    </div>
                    <div className="w-full sm:w-1/2 flex flex-col items-center justify-center gap-3">
                      <PlayoffCard
                        key={"round4-game3"}
                        team1={getTeamsForRoundAndGame(4, 2, 2)[0]}
                        team2={getTeamsForRoundAndGame(4, 2, 2)[1]}
                        stateToUpdate={runnerUps[4]}
                        updateState={updateTeamsToGoThrough}
                        round={4}
                      />
                    </div>
                  </div>
                  <Button
                    className="bg-green-500 min-w-[270px] h-16 hover:bg-green-950"
                    variant="secondary"
                    onClick={() => {
                      setPlayoffsTabs((prev) => `${Number(prev) / 2}`);
                      handlePlayoffGameClick();
                    }}
                  >
                    Confirm
                  </Button>
                </>
              ) : null}
            </TabsContent>
            <TabsContent
              value="2"
              className="w-full flex flex-col items-center justify-center gap-4"
            >
              {Object.entries(runnerUps[4]).length > 0 ? (
                <>
                  <PlayoffCard
                    key={"round2-game1"}
                    team1={getTeamsForRoundAndGame(2, 1, 1)[0]}
                    team2={getTeamsForRoundAndGame(2, 1, 1)[1]}
                    stateToUpdate={runnerUps[2]}
                    updateState={updateTeamsToGoThrough}
                    round={2}
                  />
                  <Button
                    className="bg-green-500 min-w-[270px] h-16 hover:bg-green-950"
                    variant="secondary"
                    onClick={() => {
                      toaster.toast({
                        variant: "destructive",
                        title: t("toasts.pickems.updatePlayoffsError.title"),
                        description: t(
                          "toasts.pickems.updatePlayoffsError.description"
                        ),
                      });
                    }}
                  >
                    Confirm
                  </Button>
                </>
              ) : null}
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Pickems;

type Team = {
  game: number;
  code: string;
  name: string;
};
type PlayoffCardProps = {
  team1: Team;
  team2: Team;
  stateToUpdate: any;
  round: number;
  updateState: (team: Team, round: number) => void;
};

const PlayoffCard = (props: PlayoffCardProps) => {
  const t = useTranslations("countries");
  const [winner, setWinner] = useState<Team>();

  const handleClick = (team: Team) => {
    setWinner(team);
    props.updateState(team, props.round);
  };

  useEffect(() => {
    // This effect ensures that the local state is in sync with the global state
    if (props.stateToUpdate[props.team1.code]) {
      setWinner(props.team1);
    } else if (props.stateToUpdate[props.team2.code]) {
      setWinner(props.team2);
    } else {
      setWinner(undefined);
    }
  }, [props.team1, props.team2]);

  return (
    <Card
      className={`min-h-24 min-w-[400px] flex justify-center items-center gap-4 bg-neutral-600 border-neutral-950 border-2 select-none ${
        winner === props.team1
          ? "border-l-2 border-l-green-500"
          : winner === props.team2
          ? "border-r-2 border-r-green-500"
          : ""
      }`}
    >
      <span
        className={`flex gap-2 items-center justify-start h-full p-4 w-1/2 cursor-pointer rounded`}
        onClick={() => handleClick(props.team1)}
      >
        <span className={`fi fi-${props.team1.code} text-2xl`}></span>
        <span
          className={`${
            winner === props.team1
              ? "font-bold border-b-2 border-b-green-500"
              : ""
          }`}
        >
          {t(props.team1.name)}
        </span>
      </span>
      <span className="flex justify-center items-center border border-green-500 bg-neutral-600 text-white rounded-full w-8 h-8 p-2">
        <span>VS</span>
      </span>
      <span
        className={`flex gap-2 items-center justify-end h-full p-4 w-1/2 cursor-pointer rounded`}
        onClick={() => handleClick(props.team2)}
      >
        <span
          className={`${
            winner === props.team2
              ? "font-bold border-b-2 border-b-green-500"
              : ""
          }`}
        >
          {t(props.team2.name)}
        </span>
        <span className={`fi fi-${props.team2.code} text-2xl`}></span>
      </span>
    </Card>
  );
};
