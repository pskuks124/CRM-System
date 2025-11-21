import type { MetaResponse, Todo, TodoInfo, Filter } from "../types/types";
import axios from "axios";

const api = axios.create({ baseURL: "https://easydev.club/api/v1" });
async function createTodo(title: string): Promise<void> {
  return await api.post("/todos", { title, isDone: false });
}

async function updateTodo(todo: Todo): Promise<void> {
  return await api.put(`/todos/${todo.id}`, {
    title: todo.title,
    isDone: todo.isDone,
  });
}

async function deleteTodo(id: number): Promise<void> {
  return await api.delete(`/todos/${id}`);
}

async function refreshTodos(
  filter: Filter,
): Promise<MetaResponse<Todo, TodoInfo>> {
  const response = await api.get(`/todos`, { params: { filter } });
  const resData = await response.data;
  return resData;
}

export { createTodo, updateTodo, deleteTodo, refreshTodos };
