"use client";
import { Group } from "@/app/components/group";
import PointsInfoPopover from "@/app/components/points-info-popover";
import { Button } from "@/app/components/ui/button";
import { useToast } from "@/app/components/ui/use-toast";
import { mockedGroups } from "@/app/mocked-data";
import { GroupData } from "@/app/types";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { isMobile } from "react-device-detect";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

const Pickems = (): JSX.Element => {
  const toaster = useToast();
  const t = useTranslations("PickemsScreen");

  const [previousGroups, _] = useState<GroupData>(mockedGroups.data);
  const [currentGroups, setCurrentGroups] = useState<GroupData>(
    previousGroups || {}
  );

  const updateCurrentGroups = (newGroup: GroupData) => {
    setCurrentGroups((prev) => {
      return { ...prev, ...newGroup };
    });
  };

  const handleSubmit = (): void => {
    //TODO: Save ordered groups
    // toaster.toast({
    //   title: "Success!",
    //   description: "Your pickems were successfully saved",
    // });
    toaster.toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "There was a problem with your pickems. Try again later!",
    });
  };

  return (
    <div className="flex flex-col gap-10 items-center w-full">
      <div className="flex flex-row gap-6 mt-3 sm:mt-0">
        <div className="text-6xl text-green-500">{t("title")}</div>
        <PointsInfoPopover />
      </div>
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
        {t("button")}
      </Button>
    </div>
  );
};

export default Pickems;
