"use server";

import { addTodoToDB, toggleTodoInDB, deleteTodoFromDB } from "./queries";
import { revalidatePath } from "next/cache";

// State type for useActionState
interface ActionState {
  message: string;
  success: boolean;
}

// Original action for direct form usage
export async function addTodo(formData: FormData) {
  const task = formData.get("task") as string;
  if (!task) return;
  await addTodoToDB(task);
  revalidatePath("/todos");
}

// useActionState compatible version
export async function addTodoWithState(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const task = formData.get("task") as string;
    
    if (!task || task.trim().length === 0) {
      return {
        message: "Please enter a task",
        success: false
      };
    }
    
    if (task.trim().length > 100) {
      return {
        message: "Task is too long (max 100 characters)",
        success: false
      };
    }
    
    await addTodoToDB(task.trim());
    revalidatePath("/todos");
    
    // Return empty state after successful addition to clear the form
    return {
      message: "",
      success: true
    };
    
  } catch (error) {
    console.error("Error adding todo:", error);
    return {
      message: "Something went wrong. Please try again.",
      success: false
    };
  }
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