'use client';

import { XCircleIcon } from "@heroicons/react/24/solid";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";

type Props = {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | undefined | null;
};

const TodoCard = ({
  todo,
  index,
  id,
  innerRef,
  dragHandleProps,
  draggableProps,
}: Props) => {
  return <div
    {...draggableProps}
    {...dragHandleProps}
    ref={innerRef}
    className="bg-white rounded-md space-y-2 drop-shadow-md "
  >
    <div className="flex items-center justify-between p-5">
      <p className="text-gray-500 text-sm">{todo.title}</p>
      <button className="text-red-500 hover:text-red-600">
        <XCircleIcon className="ml-5 h-8 w-8" />
      </button>
    </div>
  </div>;
};

export default TodoCard;
