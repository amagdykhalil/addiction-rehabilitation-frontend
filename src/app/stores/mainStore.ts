import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";

export const mainStore = configureStore({
  reducer: rootReducer,

  devTools: process.env.NODE_ENV !== "production" && {
    name: "ARC Frontend",
    trace: true,
    traceLimit: 25,
    maxAge: 50,
    // Features to enable
    features: {
      pause: true,
      lock: true,
      persist: true,
      export: true,
      import: "custom",
      jump: true,
      skip: true,
      reorder: true,
      dispatch: true,
      test: true,
    },
  },
});

export type RootState = ReturnType<typeof mainStore.getState>;
export type AppDispatch = typeof mainStore.dispatch;
