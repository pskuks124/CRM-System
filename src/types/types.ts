type TodoRequest = Partial<Omit<Todo, "id" | "created">>;

interface Todo {
  id: number;
  title: string;
  created: string;
  isDone: boolean;
  inEdit?: boolean;
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

interface Tab {
  name: string;
  key: keyof TodoInfo;
}

export type { Todo, TodoRequest, TodoInfo, MetaResponse, Tab };
