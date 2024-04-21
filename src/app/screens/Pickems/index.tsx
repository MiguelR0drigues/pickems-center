import { Group } from "@/components/group";
import PointsInfoPopover from "@/components/points-info-popover";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { mockedGroups } from "@/mocked-data";
import { GroupData } from "@/types";
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Pickems = (): JSX.Element => {
  const toaster = useToast();

  const [previousGroups, setPreviousGroups] = useState<GroupData>(
    mockedGroups.data
  );
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
    <div className="flex flex-col gap-10 items-center">
      <div className="flex flex-row gap-6">
        <div className="text-6xl text-white">PICKEMS</div>
        <PointsInfoPopover />
      </div>
      <div className="flex flex-wrap flex-row gap-8 justify-center items-center">
        <DndProvider backend={HTML5Backend}>
          {Object.entries(currentGroups).map((group, index) => (
            <Group
              key={index}
              id={`pickems-group-${index}`}
              groupName={group[0]}
              groupsData={group[1]}
              updateCurrentGroups={updateCurrentGroups}
            />
          ))}
        </DndProvider>
      </div>
      <Button
        className="bg-green-500 w-1/3 h-16 hover:bg-green-950"
        variant="secondary"
        onClick={handleSubmit}
      >
        Save
      </Button>
    </div>
  );
};

export default Pickems;
