import { useRouter } from "next/router";

import en from "src/locals/en";
import uz from "src/locals/uz";

export default function ChangeLanguageComponent() {
  const router = useRouter();
  let { locale } = router;
  let t = locale === "en" ? en : uz;
  console.log(locale);

  const changeLanguage = (e) => {
    const { value } = e.target;
    router.push(router.pathname, router.asPath, { locale: value });
  };

  return (
    <div>
      <select onChange={changeLanguage} defaultValue={locale}>
        <option value="en">EN</option>
        <option value="uz">UZ</option>
      </select>

      <h2>{t.subtitle}</h2>
    </div>
  );
}
