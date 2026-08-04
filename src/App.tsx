import { HomePage } from "./pages/HomePage";
import { SkillcraftArticle } from "./pages/SkillcraftArticle";
import { PalaRifleGuide } from "./pages/PalaRifleGuide";

export function App() {
  const path = window.location.pathname.replace(/\/$/, "");
  if (path === "/skillcraft-regression") {
    return <SkillcraftArticle />;
  }
  if (path === "/wc3-pala-rifle-mastery") {
    return <PalaRifleGuide />;
  }
  return <HomePage />;
}
