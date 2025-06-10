import { Provider } from "react-redux";
import { type ReactNode } from "react";
import { store } from "@/app/stores";


export const StoreProvider = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};
