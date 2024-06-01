"use client";
import AuthContent from "@/app/components/auth-content";
import EmptyState from "@/app/components/empty-state";
import { Group } from "@/app/components/group";
import PointsInfoPopover from "@/app/components/points-info-popover";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/app/components/ui/dialog";
import { useToast } from "@/app/components/ui/use-toast";
import { useUser } from "@/app/contexts/UserContext";
import { GroupData } from "@/app/types";
import { createClient } from "@/app/utils/supabase/client";
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
  const supabase = createClient();

  const [currentGroups, setCurrentGroups] = useState<GroupData>({});
  const [showDialog, setShowDialog] = useState<boolean>(false);

  useEffect(() => {
    async function fetchPickems() {
      const { data, error } = await supabase.rpc("getValues");
      return { data, error };
    }

    const fetchData = async () => {
      const { data, error } = await fetchPickems();
      if (error) {
        toaster.toast({
          variant: "destructive",
          title: t("toasts.pickems.fetchError.title"),
          description: t("toasts.pickems.fetchError.description"),
        });
      } else {
        setCurrentGroups(data);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateCurrentGroups = (newGroup: GroupData) => {
    setCurrentGroups((prev) => {
      return { ...prev, ...newGroup };
    });
  };

  const handleSubmit = (): any => {
    if (!user) return setShowDialog(true);

    async function updatePickems() {
      const { data, error } = await supabase.rpc("updateOrCreateValues", {
        groups: currentGroups,
        userUUID: user?.id,
      });
      return { data, error };
    }

    const updateDate = async () => {
      const { data, error } = await updatePickems();
      if (error) {
        toaster.toast({
          variant: "destructive",
          title: t("toasts.pickems.fetchError.title"),
          description: t("toasts.pickems.fetchError.description"),
        });
      } else {
        toaster.toast({
          title: t("toasts.pickems.updateSuccess.title"),
          description: t("toasts.pickems.updateSuccess.description"),
        });
      }
    };

    updateDate();

    toaster.toast({
      variant: "destructive",
      title: t("toasts.pickems.updateError.title"),
      description: t("toasts.pickems.updateError.description"),
    });
  };

  return (
    <div className="flex flex-col gap-10 items-center w-full">
      <div className="flex flex-row gap-6 mt-3 sm:mt-0">
        <div className="text-6xl text-green-500">
          {t("PickemsScreen.title")}
        </div>
        <PointsInfoPopover />
      </div>
      {currentGroups && Object.values(currentGroups).length > 0 ? (
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
