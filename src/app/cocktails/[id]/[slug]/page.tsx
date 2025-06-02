import { slugit } from "@/helpers";
import Link from "next/link";
interface PageParams {
  id: string;
  slug: string;
}
import Image from "next/image";
import type { Metadata } from "next";

/**
 * DYNAMIC PARAMS (UNKNOWN PATHS => BUILD ON FIRST REQUEST)
 */
// is default = ongekende urls worden toch statisch opgebouw on first request
export const dynamicParams = true;

/**
 * METADATA
 */
export const generateMetadata = async ({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> => {
  const { id } = await params;
  const resp = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const data = await resp.json();
  return {
    title: data.drinks[0].strDrink,
    description: data.drinks[0].strInstructions,
    alternates: {
      canonical: `/cocktails/${id}/${slugit(data.drinks[0].strDrink)}`,
    },
    openGraph: {
      title: data.drinks[0].strDrink,
      description: data.drinks[0].strInstructions,
      images: {
        url: data.drinks[0].strDrinkThumb,
      },
    },
  };
};

/**
 * PAGE JSX
 */
const page = async ({ params }: { params: Promise<PageParams> }) => {
  const { id } = await params;
  const resp = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const data = await resp.json();
  return (
    <div className="cocktail">
      <h1>{data.drinks[0].strDrink}</h1>
      <Link href="/cocktails">Back to cocktails</Link>
      <p>{data.drinks[0].strInstructions}</p>
      <Image
        src={data.drinks[0].strDrinkThumb}
        width={700}
        height={700}
        alt={data.drinks[0].strDrink}
      />
    </div>
  );
};

interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

/**
 * LIST WITH PARAMS TO PREBUILD STATIC DETAIL PAGES (ONLY LEMON COCKTAILS ARE PREBUILD)
 */
export async function generateStaticParams(): Promise<PageParams[]> {
  const resp = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=lemon"
  );
  const data = await resp.json();
  return data.drinks.map((dr: Cocktail) => ({
    id: dr.idDrink,
    slug: slugit(dr.strDrink),
  }));
}

export default page;
