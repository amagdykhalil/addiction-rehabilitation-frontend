import { AppRouter } from "@/app/router";
import AppProviders from "./providers/AppProviders";
function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}

export default App;
