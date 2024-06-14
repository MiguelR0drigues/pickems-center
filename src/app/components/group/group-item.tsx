import type { Identifier, XYCoord } from "dnd-core";
import { ChevronUp, Plus } from "lucide-react";
import type { FC, ReactNode } from "react";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Card, CardHeader, CardTitle } from "../ui/card";

const ItemTypes = {
  CARD: "card",
};

export interface CardProps {
  id: any;
  text: string;
  index: number;
  code: string;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  isThirds: boolean;
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
  isThirds,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const iconToRender: { [key: number]: ReactNode } = {
    0: <ChevronUp />,
    1: <ChevronUp />,
    2: (
      <span className="flex items-center justify-center font-bold min-w-[24px]">
        ?
      </span>
    ),
    3: <Plus className="rotate-45" />,
  };

  const iconsToRenderForThirds: { [key: number]: ReactNode } = {
    0: <ChevronUp />,
    1: <ChevronUp />,
    2: <ChevronUp />,
    3: <ChevronUp />,
    4: <Plus className="rotate-45" />,
    5: <Plus className="rotate-45" />,
  };

  const colors: { [key: number]: string } = {
    0: "bg-green-500",
    1: "bg-green-500",
    2: "bg-yellow-500",
    3: "bg-red-500",
  };

  const colorsForThirds: { [key: number]: string } = {
    0: "bg-green-500",
    1: "bg-green-500",
    2: "bg-green-500",
    3: "bg-green-500",
    4: "bg-red-500",
    5: "bg-red-500",
  };

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
  // drag(drop(ref));
  return (
    <Card
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
      className={`country h-16 flex justify-between items-center select-none ${
        isThirds ? "sm:h-14" : "sm:h-24"
      }`}
    >
      <CardHeader className="border-gray-200 dark:border-gray-800 flex flex-row w-full justify-between items-center text-start">
        <div className="flex items-center gap-3 h-full">
          <span
            className={`flex items-center justify-center min-h-[60px] ${
              isThirds ? "sm:min-h-[50px]" : "sm:min-h-[90px]"
            } rounded-l ml-[-22px] ${
              isThirds ? colorsForThirds[index] : colors[index]
            }`}
          >
            {isThirds ? iconsToRenderForThirds[index] : iconToRender[index]}
          </span>
          <div className="border border-green-500 p-1 rounded-md bg-neutral-600 ">
            <span
              className={`fi fi-${code} ${isThirds ? "text-lg" : "text-3xl"}`}
            ></span>
          </div>
        </div>
        <CardTitle
          className={`text-xl ${
            isThirds ? "sm:text-xl" : "sm:text-2xl"
          } text-center`}
        >
          {" "}
          {text}
        </CardTitle>
        {/* <GrabIcon /> */}
      </CardHeader>
    </Card>
  );
};
