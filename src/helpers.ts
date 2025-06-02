import slugify from "slugify";

export const slugit = (str: string) => slugify(str, { lower: true });

export const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
