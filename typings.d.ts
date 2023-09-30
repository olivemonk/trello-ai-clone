interface Board {
  columns: Map<TypeColumn, Column>;
}

type TypedColumn = "todo" | "inprogress" | "done";

interface Column {
  id: TypeColumn;
  todos: Todo[];
}

interface Todo {
  $id: string;
  $createdAt: string;
  title: string;
  status: TypeColumn;
  image?: Image;
}

interface Image {
  buckedId: string;
  fileId: string;
}
