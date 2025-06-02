"use server";

import { addTodoToDB, toggleTodoInDB, deleteTodoFromDB } from "./queries";
import { revalidatePath } from "next/cache";

export async function addTodo(formData: FormData) {
  const task = formData.get("task") as string;
  if (!task) return;
  await addTodoToDB(task);
  revalidatePath("/todos");
}

export async function toggleTodo(formData: FormData) {
  const id = Number(formData.get("id"));
  const checked = formData.get("checked") === "true";
  await toggleTodoInDB(id, checked);
  revalidatePath("/todos");
}

export async function deleteTodo(formData: FormData) {
  const id = Number(formData.get("id"));
  await deleteTodoFromDB(id);
  revalidatePath("/todos");
}