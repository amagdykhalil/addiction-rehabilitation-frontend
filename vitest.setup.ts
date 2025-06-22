import { describe, it, expect, afterEach, beforeAll, afterAll } from "vitest";
import { server } from "./__mocks__/server";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

// Make testing utilities globally available
global.describe = describe;
global.it = it;
global.expect = expect;
