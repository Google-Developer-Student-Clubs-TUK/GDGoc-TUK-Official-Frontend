import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import { useState } from "react";

interface UseDragSortProps<T> {
  itemList: T[];                                  
  onUpdateOrder: (newOrder: T[]) => void;       // 정렬 후 호출할 값
  idKey?: keyof T;                               
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useDragSort = <T extends Record<string, any>>({
  itemList,
  onUpdateOrder,
  idKey = "id", 
}: UseDragSortProps<T>) => {

  const [activeItem, setActiveItem] = useState<T | null>(null);

  // 센서 설정
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    const currentItem = itemList.find(
      (item) => item[idKey] === active.id
    );

    setActiveItem(currentItem || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      setActiveItem(null);
      return;
    }

    const oldIndex = itemList.findIndex(
      (item) => item[idKey] === active.id
    );
    const newIndex = itemList.findIndex(
      (item) => item[idKey] === over.id
    );

    if (oldIndex === -1 || newIndex === -1) {
      setActiveItem(null);
      return;
    }

    const newOrderValue = arrayMove(itemList, oldIndex, newIndex);

    // 순서를 업데이트하고 싶으면 여기서 가공 가능!
    const reorderedList = newOrderValue.map((item, index) => ({
      ...item,
      order: index + 1, // 여기 가공은 사용자 선택!
    }));

   
    onUpdateOrder(reorderedList);

    setActiveItem(null);
  };

  return {
    activeItem,
    sensors,
    handleDragStart,
    handleDragEnd,
  };
};

export default useDragSort;
