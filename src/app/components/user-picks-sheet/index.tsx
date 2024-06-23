import { GroupData } from "@/app/types";
import { useTranslations } from "next-intl";
import { isMobile } from "react-device-detect";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { Group } from "../group";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";

type Props = {
  isSheetOpen: boolean;
  setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pickems: { groups: GroupData; thirdsToAdvance: GroupData };
  userName: string;
};

const UserPicksSheet = ({
  isSheetOpen,
  setIsSheetOpen,
  pickems,
  userName,
}: Props) => {
  const t = useTranslations("LeaderboardScreen");
  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetContent side={"left"} className="flex flex-col items-center w-full">
        <SheetHeader>
          <SheetTitle className="text-green-600">
            {t("sheet.title", { username: userName })}
          </SheetTitle>
          <SheetDescription>
            {t("sheet.description", { username: userName })}
          </SheetDescription>
        </SheetHeader>
        <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
          <div className="flex flex-wrap flex-row gap-8 justify-center items-center w-full h-full rounded overflow-x-hidden overflow-y-auto">
            {Object.entries(pickems.groups).map((group, index) => (
              <Group
                key={index}
                id={`pickems-group-${index}`}
                groupName={group[0]}
                groupsData={group[1]}
                updateCurrentGroups={console.log}
                isLeaderboardSheet
              />
            ))}
            <Group
              id={`pickems-group-thirds`}
              groupName={"thirdsToAdvance"}
              //@ts-ignore
              groupsData={pickems.thirdsToAdvance}
              updateCurrentGroups={console.log}
              isThirds
              isLeaderboardSheet
            />
          </div>
        </DndProvider>
        <SheetFooter className="w-full">
          <SheetClose asChild>
            <Button
              className="bg-green-700 hover:bg-green-950 text-white w-full"
              type="submit"
            >
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default UserPicksSheet;
