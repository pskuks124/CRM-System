import type { MetaResponse, Todo, TodoInfo } from "../types/types";

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

async function putTodos(item: Todo): Promise<void> {
  const body = JSON.stringify({ title: item.title, isDone: item.isDone });
  const response = await fetch(`${url}/todos/${item.id}`, {
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

async function getTodos(
  tab: keyof TodoInfo,
): Promise<MetaResponse<Todo, TodoInfo>> {
  const response = await fetch(`${url}/todos?filter=${tab}`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error();
  }
  const resData = await response.json();
  return resData;
}

export { postTodos, putTodos, deleteTodos, getTodos };
