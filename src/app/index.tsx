import { RouterProvider } from "@/app/providers/RouterProvider";
import AppProviders from "./providers/AppProviders";

function App() {
  return (
    <AppProviders>
      <RouterProvider />
    </AppProviders>
  );
}

export default App;
