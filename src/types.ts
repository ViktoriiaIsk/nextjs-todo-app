import type { RowDataPacket } from "mysql2";

export interface Id extends RowDataPacket {
  id: number;
}

export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

export interface PokemonApiResult {
  results: {
    name: string;
    url: string;
  }[];
}
export type Todo = {
  id: number;
  task: string;
  checked: boolean;
  image?: string;
};
