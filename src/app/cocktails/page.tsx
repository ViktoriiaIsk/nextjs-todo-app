import Link from "next/link";
import Image from "next/image";
import { slugit } from "@/helpers";
interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}
import type { Metadata } from "next";

/**
 * METADATA
 */
export const metadata: Metadata = {
  title: "Lemon Cocktails overview",
  description: "These are all my lemon cocktails",
  openGraph: {
    title: "Lemon Cocktails overview",
    description: "These are all my lemon cocktails",
    images: {
      url: "/pitch.jpg",
    },
  },
};

/**
 * INCREMENTAL STATIC REGENERATION
 */
export const revalidate = 86400; // once a day

/**
 * PAGE JSX
 */
const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ search: string }>;
}) => {
  const { search } = await searchParams;

  const resp = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search || ""}`
  );
  const data: { drinks: Cocktail[] } = await resp.json();
  return (
    <>
      <h1>Search 4 Cocktails</h1>
      <form action="">
        <input type="text" name="search" defaultValue={search} />
        <button>Search</button>
      </form>
      {Array.isArray(data.drinks) && data?.drinks?.length && (
        <ul className="cocktails">
          {data.drinks.map((drink) => (
            <li key={drink.idDrink}>
              <Link
                href={`/cocktails/${drink.idDrink}/${slugit(drink.strDrink)}`}
              >
                <div>
                  <Image
                    width={200}
                    height={200}
                    src={drink.strDrinkThumb}
                    alt={drink.strDrink}
                  />
                </div>
                <p>{drink.strDrink}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
export default page;
