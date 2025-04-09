import React from "react";
import Image from "next/image";

import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities/useSyntheticListeners";

interface DragHandlerProps {
  listeners: SyntheticListenerMap | undefined;
  attributes: DraggableAttributes;
}
const DragHandler = ({ listeners, attributes }: DragHandlerProps) => {
  return (
    <div className="flex w-full justify-center">
      <Image
        {...listeners}
        {...attributes}
        src="/icon/modify_align.png"
        alt="순서수정"
        width={24}
        height={24}
        className="min-w-[24px] min-h-[24px] object-contain cursor-pointer"
      />
    </div>
  );
};

export default DragHandler;
