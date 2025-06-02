import { supabase } from './supabase';
import type { Todo } from '../types';

/**
 * Get all todos from Supabase, ordered by creation date (newest first)
 * @returns Promise<Todo[]> Array of todos
 */
export async function getTodosFromDB(): Promise<Todo[]> {
  try {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch todos:', error);
    throw error;
  }
}

/**
 * Add a new todo to Supabase
 * @param task - The todo task description
 * @returns Promise<void>
 */
export async function addTodoToDB(task: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('todos')
      .insert([{ task, checked: false }]);

    if (error) {
      console.error('Error adding todo:', error);
      throw error;
    }
  } catch (error) {
    console.error('Failed to add todo:', error);
    throw error;
  }
}

/**
 * Toggle todo checked status in Supabase
 * @param id - Todo ID
 * @param checked - New checked status
 * @returns Promise<void>
 */
export async function toggleTodoInDB(id: number, checked: boolean): Promise<void> {
  try {
    const { error } = await supabase
      .from('todos')
      .update({ checked })
      .eq('id', id);

    if (error) {
      console.error('Error toggling todo:', error);
      throw error;
    }
  } catch (error) {
    console.error('Failed to toggle todo:', error);
    throw error;
  }
}

/**
 * Delete a todo from Supabase
 * @param id - Todo ID to delete
 * @returns Promise<void>
 */
export async function deleteTodoFromDB(id: number): Promise<void> {
  try {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  } catch (error) {
    console.error('Failed to delete todo:', error);
    throw error;
  }
} 