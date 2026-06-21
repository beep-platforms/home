import { HomePage } from "./pages/HomePage";
import { SkillcraftArticle } from "./pages/SkillcraftArticle";
import { QuietPartsPage } from "./pages/QuietPartsPage";

export function App() {
  const path = window.location.pathname.replace(/\/$/, "");
  if (path === "/skillcraft-regression") {
    return <SkillcraftArticle />;
  }
  if (path === "/the-quiet-parts") {
    return <QuietPartsPage />;
  }
  return <HomePage />;
}
