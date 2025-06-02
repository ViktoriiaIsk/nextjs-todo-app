import PokemonCard from "./PokemonCard";
import type { Pokemon, Id } from "@/types";
const Pokemons = async () => {
  const resp = await fetch("http://localhost:3000/api/pokedex", {
    next: { tags: ["pokedex"] },
  });
  const ids: Id[] = await resp.json();
  const pokemonResponse = await fetch("http://localhost:3000/api/pokemon", {
    next: { tags: ["pokemons"] },
    cache: "force-cache",
  });
  const pokemons: Pokemon[] = await pokemonResponse.json();
  return (
    <div>
      <h1>Pokemons</h1>
      <ul className="pokemons">
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            caught={ids.map((id) => id.id).includes(pokemon.id)}
          />
        ))}
      </ul>
    </div>
  );
};
export default Pokemons;
