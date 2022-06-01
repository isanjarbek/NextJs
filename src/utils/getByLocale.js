import en from "../locals/en.json";
import uz from "../locals/uz.json";

export const getByLocale = (locale) => {
  let t = locale === `en` ? en : uz;

  return t;
};
