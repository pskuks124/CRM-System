import type { MetaResponse, Todo, TodoInfo, filter } from "../types/types";

const url = "https://easydev.club/api/v1";
async function postTodos(title: string): Promise<void> {
  const body = JSON.stringify({ title, isDone: false });
  const response = await fetch(`${url}/todos`, {
    method: "POST",
    body,
  });
  if (!response.ok) {
    throw new Error();
  }
}

async function putTodos(todo: Todo): Promise<void> {
  const body = JSON.stringify({ title: todo.title, isDone: todo.isDone });
  const response = await fetch(`${url}/todos/${todo.id}`, {
    method: "PUT",
    body,
  });
  if (!response.ok) {
    throw new Error();
  }
}

async function deleteTodos(id: number): Promise<void> {
  const response = await fetch(`${url}/todos/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error();
  }
}

async function getTodos(filter: filter): Promise<MetaResponse<Todo, TodoInfo>> {
  const response = await fetch(`${url}/todos?filter=${filter}`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error();
  }
  const resData = await response.json();
  return resData;
}

export { postTodos, putTodos, deleteTodos, getTodos };
