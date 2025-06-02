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
        message: "Task cannot be empty!",
        success: false
      };
    }
    
    if (task.length > 255) {
      return {
        message: "Task is too long (max 255 characters)!",
        success: false
      };
    }
    
    await addTodoToDB(task.trim());
    revalidatePath("/todos");
    
    return {
      message: "Task added successfully! ✅",
      success: true
    };
    
  } catch (error) {
    console.error("Error adding todo:", error);
    return {
      message: "Failed to add task. Please try again.",
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