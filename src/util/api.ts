import type { State } from "../store";

const url = "https://easydev.club/api/v1";

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

class Options {
  method: string;
  body?: BodyInit;
  constructor(methodData: string, bodyData?: BodyInit) {
    this.method = methodData;
    this.body = bodyData;
  }
}

function postTodos(bodyData: BodyInit, state: State) {
  fetch(`${url}/todos`, new Options("POST", bodyData))
    .then(
      (result) => result.json(),
      (error) => console.log(`error, ${error}`),
    )
    .then((result) => {
      console.log(`POST went successful, ${result}`);
      getTodos(state.sortType, state);
    });
}

function putTodos(id: number, bodyData: BodyInit, state: State) {
  fetch(`${url}/todos/${id}`, new Options("PUT", bodyData))
    .then(
      (result) => result.json(),
      (error) => console.log(`error1, ${error}`),
    )
    .then(
      (result) => {
        getTodos(state.sortType, state);
        console.log(`success, ${result}`);
      },
      (error) => console.log(`error2, ${error}`),
    );
}

function deleteTodos(id: number, state: State) {
  fetch(`${url}/todos/${id}`, new Options("DELETE"))
    .then(
      (result) => result.text(),
      (error) => error.text(),
    )
    .then(
      (result) => {
        console.log(result);
        getTodos(state.sortType, state);
      },
      (error) => console.log(`error2, ${error}`),
    );
}

function getTodos(string: keyof TodoInfo, state: State) {
  fetch(`${url}/todos?filter=${string}`, new Options("GET"))
    .then(
      (result) => result.json(),
      (error) => console.log(`error, ${error}`),
    )
    .then((result) => {
      if (result.data)
        state.tasks.splice(0, state.tasks.length, ...result.data);
      if (result.info) {
        for (let type in result.info)
          state.info[type as keyof TodoInfo] = result.info[type];
      }
    });
}

export type { TodoInfo, MetaResponse };
export { Todo, TodoRequest, postTodos, putTodos, deleteTodos, getTodos };
