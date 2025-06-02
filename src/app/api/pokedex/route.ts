import { NextResponse } from "next/server";
import { getCaughtPokemon } from "@/queries";

export async function GET() {
  const Ids = await getCaughtPokemon();
  return NextResponse.json(Ids);
}
