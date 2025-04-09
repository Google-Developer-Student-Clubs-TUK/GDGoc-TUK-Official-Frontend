import { useSortable } from "@dnd-kit/sortable"; // 드래그와 드롭에 대한 모든 동작을 다루는 훅
import { CSS } from "@dnd-kit/utilities"; // transform 값을 CSS 문자열로 변환하는 유틸리티
import { UniqueIdentifier } from "@dnd-kit/core";
import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities/useSyntheticListeners";

export function SortableItem({
  id,
  children,
}: {
  id: UniqueIdentifier;
  children: (props: {
    listeners: SyntheticListenerMap | undefined;
    attributes: DraggableAttributes;
  }) => React.JSX.Element;
}) {
  // useSortable 훅을 호출하면서 이 아이템의 id를 넘겨줌
  const {
    attributes, // 드래그할 수 있도록 필요한 ARIA 속성 및 드래그 속성을 포함
    listeners, // 드래그 이벤트 리스너 (마우스 다운, 키보드 이벤트 등)
    setNodeRef, // 드래그가 가능한 DOM 요소를 등록 (ref처럼 사용)
    isDragging,
    transform, // 드래그로 인해 발생한 이동 값 (x, y 좌표)
    transition, // 애니메이션에 사용되는 전환 효과 (부드럽게 이동)
  } = useSortable({ id }); // useSortable 호출로 해당 요소를 드래그 가능하게 설정

  // 드래그로 인한 스타일 지정
  const style = {
    transform: CSS.Transform.toString(transform), // transform 객체를 CSS 문자열로 변환
    transition, // transition 효과 (기본적으로 250ms ease)
    opacity: isDragging ? 0 : undefined,
  };

  return (
    <div
      ref={setNodeRef} // 이 ref를 통해 해당 요소가 드래그 대상임을 알려줌
      style={style} // 이동이나 전환 등 스타일을 적용
      {...attributes} // 드래그 관련 속성 부착 (접근성, role 등)
      // 이벤트 리스너 부착 (onMouseDown 등 드래그 시작을 위한)
    >
      {children({ listeners, attributes })}
    </div>
  );
}
