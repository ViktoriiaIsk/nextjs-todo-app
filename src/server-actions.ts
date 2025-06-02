"use server";

import { revalidatePath } from "next/cache";
import {
  getTodosFromDB,
  addTodoToDB,
  toggleTodoInDB,
  deleteTodoFromDB,
} from "./lib/supabase-queries"; // Changed import to Supabase queries

export async function getTodos() {
  try {
    return await getTodosFromDB();
  } catch (error) {
    console.error("Failed to fetch todos:", error);
    return [];
  }
}

export async function addTodo(task: string) {
  if (!task.trim()) {
    throw new Error("Task cannot be empty");
  }
  
  if (task.length > 100) {
    throw new Error("Task cannot exceed 100 characters");
  }

  try {
    await addTodoToDB(task.trim());
    revalidatePath("/todos");
  } catch (error) {
    console.error("Failed to add todo:", error);
    throw new Error("Failed to add todo");
  }
}

export async function toggleTodo(formData: FormData) {
  const id = parseInt(formData.get("id") as string);
  const checked = formData.get("checked") === "true";

  if (!id || isNaN(id)) {
    throw new Error("Invalid todo ID");
  }

  try {
    await toggleTodoInDB(id, !checked);
    revalidatePath("/todos");
  } catch (error) {
    console.error("Failed to toggle todo:", error);
    throw new Error("Failed to update todo");
  }
}

export async function deleteTodo(formData: FormData) {
  const id = parseInt(formData.get("id") as string);

  if (!id || isNaN(id)) {
    throw new Error("Invalid todo ID");
  }

  try {
    await deleteTodoFromDB(id);
    revalidatePath("/todos");
  } catch (error) {
    console.error("Failed to delete todo:", error);
    throw new Error("Failed to delete todo");
  }
}

// Enhanced addTodo for useActionState with validation
export async function addTodoWithState(
  prevState: { message?: string; error?: string },
  formData: FormData
): Promise<{ message?: string; error?: string }> {
  const task = formData.get("task") as string;

  // Server-side validation
  if (!task?.trim()) {
    return { error: "Task cannot be empty" };
  }

  if (task.length > 100) {
    return { error: "Task cannot exceed 100 characters" };
  }

  try {
    await addTodoToDB(task.trim());
    revalidatePath("/todos");
    return { message: "Todo added successfully!" };
  } catch (error) {
    console.error("Failed to add todo:", error);
    return { error: "Failed to add todo. Please try again." };
  }
}