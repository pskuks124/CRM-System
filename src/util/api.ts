import { type State, type TodoInfo, Options } from "../types/types";

const url = "https://easydev.club/api/v1";

function postTodos(bodyData: BodyInit, state: State) {
  fetch(`${url}/todos`, new Options("POST", bodyData))
    .then(
      (result) => result.json(),
      (error) => console.log(`error, ${error}`),
    )
    .then((result) => {
      console.log(`POST went successful, ${result}`);
      getTodos(state);
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
        getTodos(state);
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
        getTodos(state);
      },
      (error) => console.log(`error2, ${error}`),
    );
}

function getTodos(state: State) {
  fetch(`${url}/todos?filter=${state.sortType}`, new Options("GET"))
    .then(
      (result) => result.json(),
      (error) => console.log(`error, ${error}`),
    )
    .then(
      (result) => {
        console.log(`success, ${result}`);
        if (result.data)
          state.tasks.splice(0, state.tasks.length, ...result.data);
        if (result.info) {
          for (let type in result.info)
            state.info[type as keyof TodoInfo] = result.info[type];
        }
      },
      (error) => console.log(`error, ${error}`),
    );
}

export { postTodos, putTodos, deleteTodos, getTodos };
