"use server";

import { revalidateTag } from "next/cache";
import { addToPokedex, removeFromPokedex } from "./queries";

export const handleCatch = async (fd: FormData) => {
  try {
    await addToPokedex(parseInt(fd.get("id") as string));
    revalidateTag("pokedex");
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
};

export const handleRelease = async (fd: FormData) => {
  try {
    await removeFromPokedex(parseInt(fd.get("id") as string));
    revalidateTag("pokedex");
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
};
