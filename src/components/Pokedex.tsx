import type { Id, Pokemon } from "@/types";
import PokemonCard from "./PokemonCard";
const Pokedex = async () => {
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
    <div className="pokedex">
      <h1>Pokedex</h1>
      <ul className="pokemons">
        {pokemons
          .filter((p) => ids.map((id) => id.id).includes(p.id))
          .map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} caught={true} />
          ))}
      </ul>
    </div>
  );
};
export default Pokedex;
