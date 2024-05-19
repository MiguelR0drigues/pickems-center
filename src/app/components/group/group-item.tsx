import type { Identifier, XYCoord } from "dnd-core";
import type { FC } from "react";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Card, CardHeader, CardTitle } from "../ui/card";
import GrabIcon from "./grab-icon";

const ItemTypes = {
  CARD: "card",
};

export interface CardProps {
  id: any;
  text: string;
  index: number;
  code: string;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const GroupItemComponent: FC<CardProps> = ({
  id,
  text,
  code,
  index,
  moveCard,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => {
      return { isDragging: monitor.isDragging() };
    },
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <Card
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
      className="country h-16 flex justify-between items-center sm:h-24"
    >
      <CardHeader className="border-gray-200 dark:border-gray-800 flex flex-row w-full justify-between items-center text-start">
        <div className="border border-green-500 p-1 rounded-md bg-neutral-600 ">
          <span className={`fi fi-${code} text-3xl`}></span>
        </div>
        <CardTitle className="text-xl sm:text-2xl"> {text}</CardTitle>
        <GrabIcon />
      </CardHeader>
    </Card>
  );
};
