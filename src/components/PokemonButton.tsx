"use client";
import { useFormStatus } from "react-dom";

const PokemonButton = ({ text }: { text: string }) => {
  const { pending } = useFormStatus();
  return (
    <button className={pending ? "loading" : ""}>
      {pending ? (text === "catch" ? "catching" : "releasing") : text}
    </button>
  );
};
export default PokemonButton;
