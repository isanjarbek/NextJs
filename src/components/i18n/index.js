import { useRouter } from "next/router";
import { getByLocale } from "@utils/getByLocale";

export default function ChangeLanguageComponent() {
  const router = useRouter();
  let { locale, pathname, asPath } = router;

  const t = getByLocale(locale);

  const changeLanguage = (e) => {
    const { value } = e.target;
    router.push(pathname, asPath, { locale: value });
  };

  return (
    <div>
      <select onChange={changeLanguage} defaultValue={locale}>
        <option value="en">EN</option>
        <option value="uz">UZ</option>
      </select>

      <h2>{t.users_page.title}</h2>
    </div>
  );
}
