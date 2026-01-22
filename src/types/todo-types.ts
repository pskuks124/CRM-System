type TodoRequest = Partial<Omit<Todo, "id" | "created">>;

interface Todo {
  id: number;
  title: string;
  created: string;
  isDone: boolean;
}

interface TodoInfo {
  all: number;
  completed: number;
  inWork: number;
}

interface MetaResponse<T, N> {
  data: T[];
  info?: N;
  meta: {
    totalAmount: number;
  };
}

interface TodoTab {
  name: string;
  key: Filter;
}

type Filter = "all" | "inWork" | "completed";

export type { Todo, TodoRequest, TodoInfo, MetaResponse, TodoTab, Filter };
