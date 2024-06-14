import { GroupData, GroupItem } from "@/app/types";
import update from "immutability-helper";
import { useTranslations } from "next-intl";
import type { FC } from "react";
import { useCallback, useState } from "react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { GroupItemComponent } from "./group-item";

export interface ContainerState {
  cards: GroupItem[];
}

export const Group: FC<{
  id: string;
  groupName: string;
  groupsData: GroupItem[];
  updateCurrentGroups: (newGroups: GroupData) => void;
  isThirds: boolean;
}> = ({ id, groupsData, groupName, updateCurrentGroups, isThirds = false }) => {
  const [cards, setCards] = useState<GroupItem[]>(groupsData);
  const t = useTranslations();

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards: GroupItem[]) => {
      const updatedCards = update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as GroupItem],
        ],
      });
      updateCurrentGroups({ [groupName]: updatedCards });

      return updatedCards;
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderCard = useCallback(
    (card: GroupItem, index: number) => {
      return (
        <GroupItemComponent
          key={card.countryId}
          index={index}
          id={card.countryId}
          code={card.code}
          text={t(`countries.${card.name.toLowerCase()}`)}
          moveCard={moveCard}
          isThirds={isThirds}
        />
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [moveCard]
  );
  return (
    <div
      id={id}
      className={`group grid max-w-[270px] min-w-[270px] ${
        isThirds ? "sm:min-w-[350px]" : "sm:min-w-[400px]"
      }`}
    >
      <Card
        className={`bg-neutral-900 ${
          isThirds ? "h-10" : "h-14"
        } flex justify-between items-center`}
      >
        <CardHeader className="border-gray-200 dark:border-gray-800 flex flex-row w-full justify-center items-center select-none">
          <CardTitle className={isThirds ? "text-xl" : ""}>
            {t("PickemsScreen.group")}{" "}
            {isThirds ? t("PickemsScreen." + groupName) : groupName}
          </CardTitle>
        </CardHeader>
      </Card>
      <div
        id={`group-dnd-${groupName}`}
        className="brightness-50"
        style={{
          // cursor: "grab"
          cursor: "not-allowed",
        }}
      >
        {cards.map((card, i) => renderCard(card, i))}
      </div>
    </div>
  );
};
