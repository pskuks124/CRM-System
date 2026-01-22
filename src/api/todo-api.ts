import type { MetaResponse, Todo, TodoInfo, Filter } from "../types/todo-types";
import { api } from "./api-client";

async function createTodo(title: string): Promise<void> {
  await api.post("/todos", { title, isDone: false });
}

async function updateTodo(todo: Todo): Promise<void> {
  await api.put(`/todos/${todo.id}`, {
    title: todo.title,
    isDone: todo.isDone,
  });
}

async function deleteTodo(id: number): Promise<void> {
  await api.delete(`/todos/${id}`);
}

async function refreshTodos(
  filter: Filter,
): Promise<MetaResponse<Todo, TodoInfo>> {
  const response = await api.get(`/todos`, { params: { filter } });
  return response.data;
}

export { createTodo, updateTodo, deleteTodo, refreshTodos };
