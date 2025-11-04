interface State {
  formText: string;
  tasks: Todo[];
  info: TodoInfo;
  sortType: keyof TodoInfo;
}

class TodoRequest {
  title: string;
  isDone: boolean;
  constructor(titleData: string, isDoneData: boolean) {
    this.title = titleData;
    this.isDone = isDoneData;
  }
}
class Todo extends TodoRequest {
  id: number;
  created: string;
  initialTitle?: string;
  constructor(
    titleData: string,
    isDoneData: boolean,
    idData: number,
    createdData: string,
  ) {
    super(titleData, isDoneData);
    this.id = idData;
    this.created = createdData;
  }
}

interface TodoInfo {
  all: number;
  completed: number;
  inWork: number;
}

interface MetaResponse {
  data: Todo[];
  info?: TodoInfo;
  meta: {
    totalAmount: number;
  };
}

interface Tab {
  displayed: string;
  name: keyof TodoInfo;
}

class Options {
  method: string;
  body?: BodyInit;
  constructor(methodData: string, bodyData?: BodyInit) {
    this.method = methodData;
    this.body = bodyData;
  }
}

export type { TodoInfo, MetaResponse, State, Tab };
export { Todo, TodoRequest, Options };
