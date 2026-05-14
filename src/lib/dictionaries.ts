import "server-only";

const dictionaries = {
  en: () => import("../dictionaries/en.json").then((module) => module.default),
  // Scaffold for future languages
  // fr: () => import("../dictionaries/fr.json").then((module) => module.default),
  // es: () => import("../dictionaries/es.json").then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;

/**
 * Retrieves the dictionary for the specified locale.
 * This is an async function meant to be used in Server Components.
 * 
 * Example usage:
 * const dict = await getDictionary('en');
 * return <h1>{dict.storefront.hero.title}</h1>
 */
export const getDictionary = async (locale: Locale = "en") => {
  return dictionaries[locale]();
};
