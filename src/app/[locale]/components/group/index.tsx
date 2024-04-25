import update from "immutability-helper";
import type { FC } from "react";
import { useCallback, useState } from "react";
import { GroupData, GroupItem } from "../../types";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { GroupItemComponent } from "./group-item";

const style = {
  width: 400,
};

export interface ContainerState {
  cards: GroupItem[];
}

export const Group: FC<{
  id: string;
  groupName: string;
  groupsData: GroupItem[];
  updateCurrentGroups: (newGroups: GroupData) => void;
}> = ({ id, groupsData, groupName, updateCurrentGroups }) => {
  const [cards, setCards] = useState<GroupItem[]>(groupsData);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards: GroupItem[]) => {
      updateCurrentGroups({ [groupName]: prevCards });
      return update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as GroupItem],
        ],
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderCard = useCallback(
    (card: GroupItem, index: number) => {
      return (
        <GroupItemComponent
          key={card.id}
          index={index}
          id={card.id}
          code={card.code}
          text={card.name}
          moveCard={moveCard}
        />
      );
    },
    [moveCard]
  );

  return (
    <div style={style} id={id} className="group max-w-90 w-60 grid">
      <Card className="bg-neutral-900 h-14 flex justify-between items-center">
        <CardHeader className="border-gray-200 dark:border-gray-800 flex flex-row w-full justify-center items-center">
          <CardTitle>Group {groupName}</CardTitle>
        </CardHeader>
      </Card>
      <div
        id={`group-dnd-${groupsData[0].id.split("")[0]}`}
        style={{ cursor: "grab" }}
      >
        {cards.map((card, i) => renderCard(card, i))}
      </div>
    </div>
  );
};
