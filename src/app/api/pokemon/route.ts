import { NextResponse } from "next/server";
import type { Pokemon, PokemonApiResult } from "@/types";
export async function GET() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data: PokemonApiResult = await response.json();
  const responses = await Promise.all(data.results.map((el) => fetch(el.url)));
  const allPokemon: Pokemon[] = await Promise.all(
    responses.map((resp) => resp.json())
  );
  const filteredData: Pokemon[] = allPokemon.map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name,
    sprites: { front_default: pokemon.sprites.front_default },
  }));
  return NextResponse.json(filteredData);
}
