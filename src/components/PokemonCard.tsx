import { addToPokedex, removeFromPokedex } from "@/queries";
import type { Pokemon } from "@/types";
import { revalidateTag } from "next/cache";
import Image from "next/image";
import PokemonButton from "./PokemonButton";
const PokemonCard = ({
  pokemon,
  caught,
}: {
  pokemon: Pokemon;
  caught: boolean;
}) => {
  const handleCatch = async (fd: FormData) => {
    "use server";
    await addToPokedex(parseInt(fd.get("id") as string));
    revalidateTag("pokedex");
  };
  const handleRelease = async (fd: FormData) => {
    "use server";
    await removeFromPokedex(parseInt(fd.get("id") as string));
    revalidateTag("pokedex");
  };
  return (
    <li>
      <div>
        <Image
          width={200}
          height={200}
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />
      </div>
      <p>{pokemon.name}</p>
      <form action={caught ? handleRelease : handleCatch}>
        <input type="hidden" name="id" value={pokemon.id} />
        <PokemonButton text={caught ? "release" : "catch"} />
      </form>
    </li>
  );
};
export default PokemonCard;
