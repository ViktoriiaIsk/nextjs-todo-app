import { connect } from "@/dbconnect";
import type { Id, Todo } from "./types";


export const getCaughtPokemon = async (): Promise<Id[]> => {
  try {
    const conn = await connect();
    const [rows] = await conn.query<Id[]>("SELECT * FROM pokedex");
    return rows;
  } catch (error) {
    throw error;
  }
};

export const addToPokedex = async (id: number): Promise<void> => {
  try {
    const conn = await connect();
    await conn.query("INSERT INTO pokedex VALUES (?)", [id]);
  } catch (error) {
    throw error;
  }
};

export const removeFromPokedex = async (id: number): Promise<void> => {
  try {
    const conn = await connect();
    await conn.query("DELETE FROM pokedex WHERE id = ?", [id]);
  } catch (error) {
    throw error;
  }
};

export async function getTodosFromDB(): Promise<Todo[]> {
  try {
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM todos ORDER BY id DESC");
    return rows as Todo[];
  } catch (error) {
    throw error;
  }
}

export async function addTodoToDB(task: string): Promise<void> {
  try {
    const conn = await connect();
    await conn.query("INSERT INTO todos (task, checked) VALUES (?, false)", [task]);
  } catch (error) {
    throw error;
  }
}

export async function toggleTodoInDB(id: number, checked: boolean): Promise<void> {
  try {
    const conn = await connect();
    await conn.query("UPDATE todos SET checked = ? WHERE id = ?", [checked, id]);
  } catch (error) {
    throw error;
  }
}

export async function deleteTodoFromDB(id: number): Promise<void> {
  try {
    const conn = await connect();
    await conn.query("DELETE FROM todos WHERE id = ?", [id]);
  } catch (error) {
    throw error;
  }
}