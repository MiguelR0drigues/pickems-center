"use client";
import AuthContent from "@/app/components/auth-content";
import Caption from "@/app/components/caption";
import EmptyState from "@/app/components/empty-state";
import { Group } from "@/app/components/group";
import PointsInfoPopover from "@/app/components/points-info-popover";
import PickemsSkeleton from "@/app/components/skeletons/pickems";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
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

  const token = jwt.sign({}, jwtToken!, {
    algorithm: "HS256",
  });

  useEffect(() => {
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

  return (
    <div className="flex flex-col gap-10 items-center w-full h-100%">
      <div className="flex flex-row gap-6 mt-3 sm:mt-0">
        <div className="text-6xl text-green-500">
          {t("PickemsScreen.title")}
        </div>
        <PointsInfoPopover />
      </div>
      <Caption />
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
                  isThirds={false}
                />
              ))}
            </div>
          </DndProvider>
          <Button
            className="bg-green-500 min-w-[270px] h-16 hover:bg-green-950"
            variant="secondary"
            onClick={handleSubmit}
            disabled={loading}
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
                  isThirds={true}
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
    </div>
  );
};

export default Pickems;
