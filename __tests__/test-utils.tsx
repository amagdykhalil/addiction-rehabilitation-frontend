import { type ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import AppProviders from "@/app/providers/AppProviders";

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AppProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
