"use client";

import { useBoardStore } from "@/store/BoardStore";
import { useEffect } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import Column from "./Column";

const Board = () => {
  const [board, getBoard, setBoardState] = useBoardStore((state) => [
    state.board,
    state.getBoard,
    state.setBoardState,
  ]);

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    // Check if user dragged card outside of board
    if (!destination) return;

    // Handle column drag
    if (type === "column") {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const rearrangedColumns = new Map(entries);
      // keep everything within the Board object and change only colums order
      setBoardState({ ...board, columns: rearrangedColumns });
    }

    // This step is needed because indexes are stored as numbers 0,1,2,... instead of id's of DND library
    const columns = Array.from(board.columns);
    const startColIndex = columns[Number(source.droppableId)]; // TODO: Check this: droppableId=board
    const finishColIndex = columns[Number(destination.droppableId)]; //TODO: Check this: droppableId=board

    const startCol: Column = {
      id: startColIndex[0],
      todos: startColIndex[1].todos,
    };

    const finishCol: Column = {
      id: finishColIndex[0],
      todos: finishColIndex[1].todos,
    };

    if (!startCol || !finishCol) return;
    if (source.index === destination.index && startCol === finishCol) return;

    const newTodos = startCol.todos;
    const [todoMoved] = newTodos.splice(source.index, 1);

    if (startCol.id === finishCol.id) {
      // 1. Same column card dragged
      newTodos.splice(destination.index, 0, todoMoved);
      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };
      // Create copy of the new columns map and set it to the board
      const newColumns = new Map(board.columns);
      newColumns.set(startCol.id, newCol);
      setBoardState({ ...board, columns: newColumns });
    } else {
      // 2. Dragging to another column
      const finishTodos = Array.from(finishCol.todos);
      finishTodos.splice(destination.index, 0, todoMoved);
      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };
      // Create copy of the new columns map and set it to the board
      const newColumns = new Map(board.columns);
      newColumns.set(startCol.id, newCol);
      newColumns.set(finishCol.id, {
        id: finishCol.id,
        todos: finishTodos,
      });

      // Update in DB
    //   updateTodoInDB(todoMoved, finishCol.id);

      setBoardState({ ...board, columns: newColumns });
    }
  };

  console.log(board);

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable type="column" droppableId="board" direction="horizontal">
        {(provided) => (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {/* rendering all the columns */}
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column key={id} id={id} todos={column.todos} index={index} />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
