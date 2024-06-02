"use client";
import AuthContent from "@/app/components/auth-content";
import EmptyState from "@/app/components/empty-state";
import { Group } from "@/app/components/group";
import PointsInfoPopover from "@/app/components/points-info-popover";
import PickemsSkeleton from "@/app/components/skeletons/pickems";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/app/components/ui/dialog";
import { useToast } from "@/app/components/ui/use-toast";
import { useUser } from "@/app/contexts/UserContext";
import { GroupData } from "@/app/types";
import jwt from "jsonwebtoken";
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

  const [currentGroups, setCurrentGroups] = useState<GroupData>({});
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const token = jwt.sign({}, process.env.NEXT_PUBLIC_JWT_SECRET!, {
    algorithm: "HS256",
  });

  useEffect(() => {
    fetch(
      `https://zpafftlifxzqrzuafugi.supabase.co/functions/v1/getGroupsScores?userUUID=${
        user?.id || "00000000-0000-0000-0000-000000000000"
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
        setTimeout(() => setLoading(false), 5000);
        setCurrentGroups(res.groups);
      })
      .catch(() => {
        setLoading(false);
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
      return { ...prev, ...newGroup };
    });
  };

  const handleSubmit = () => {
    if (!user) return setShowDialog(true);

    fetch(
      `https://zpafftlifxzqrzuafugi.supabase.co/functions/v1/updateGroupsScores`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          groups: currentGroups,
          userUUID: user?.id,
        }),
      }
    )
      .then((res) => res.json())
      .then(() => {
        toaster.toast({
          variant: "default",
          title: t("toasts.pickems.updateSuccess.title"),
          description: t("toasts.pickems.updateSuccess.description"),
        });
      })
      .catch(() =>
        toaster.toast({
          variant: "destructive",
          title: t("toasts.pickems.updateError.title"),
          description: t("toasts.pickems.updateError.description"),
        })
      );
  };

  return (
    <div className="flex flex-col gap-10 items-center w-full h-100%">
      <div className="flex flex-row gap-6 mt-3 sm:mt-0">
        <div className="text-6xl text-green-500">
          {t("PickemsScreen.title")}
        </div>
        <PointsInfoPopover />
      </div>
      {loading ? (
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
            className="bg-green-500 min-w-[270px] h-16 hover:bg-green-950"
            variant="secondary"
            onClick={handleSubmit}
          >
            {t("PickemsScreen.button")}
          </Button>
          <Dialog
            open={showDialog}
            onOpenChange={() => setShowDialog(!showDialog)}
          >
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader></DialogHeader>
              <AuthContent />
            </DialogContent>
          </Dialog>{" "}
        </>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default Pickems;
