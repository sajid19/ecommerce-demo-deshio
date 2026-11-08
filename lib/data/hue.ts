import { categories } from "./mock/categories";

/** Presentation-only: hue for the generated placeholder art. Dies with the mock images. */
export const categoryHue = (slug: string) => categories.find((c) => c.slug === slug)?.hue ?? 35;
export const categoryName = (slug: string) => categories.find((c) => c.slug === slug)?.name ?? "";
