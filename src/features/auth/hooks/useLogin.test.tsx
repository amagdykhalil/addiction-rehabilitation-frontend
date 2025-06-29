import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { authApi } from "@/entities/auth/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/entities/auth/model/useAuth";
import { useTranslation } from "react-i18next";
import { useLogin } from "./useLogin";
import { act, renderHook, waitFor } from "../../../../__tests__/test-utils";
import { postTokenGeneratedBroadcast } from "@/shared/lib/broadcasts/authBroadcasts";
import { ROUTES } from "@/shared/routes";
import i18n from "@/shared/lib/initI18n";
import type { TFunction, KeyPrefix } from "i18next";

//Mock paths
vi.mock("@/entities/auth/api");
vi.mock("react-router-dom");
vi.mock("@/entities/auth/model/useAuth");
vi.mock("react-i18next");
vi.mock("@/shared/lib/broadcasts/authBroadcasts");

describe("useLogin", () => {
  // Shared mocks
  const authApiMock = vi.mocked(authApi);
  const useNavigateMock = vi.mocked(useNavigate);
  const useAuthMock = vi.mocked(useAuth);
  const useTranslationMock = vi.mocked(useTranslation);

  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  let navigateFn: ReturnType<typeof vi.fn>;
  let setCredentialsFn: ReturnType<typeof vi.fn>;
  let logoutFn: ReturnType<typeof vi.fn>;
  let t: TFunction<string, KeyPrefix<string>>;
  let translationMock: ReturnType<typeof useTranslation>;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient.clear();

    // Common mock setup
    navigateFn = vi.fn();
    setCredentialsFn = vi.fn();
    logoutFn = vi.fn();
    useNavigateMock.mockReturnValue(navigateFn);

    useAuthMock.mockReturnValue({
      authData: null,
      setCredentials: setCredentialsFn,
      logout: logoutFn,
      isAuthenticated: false,
    });

    t = ((str: string) => str) as TFunction<string, KeyPrefix<string>>;
    translationMock = [t, i18n, true] as unknown as ReturnType<
      typeof useTranslation
    >;
    translationMock.t = t;
    translationMock.i18n = i18n;
    translationMock.ready = true;
    useTranslationMock.mockReturnValue(translationMock);
  });

  describe("when the API call is successful", () => {
    // Arrange
    const loginInput = { email: "email", password: "password" };
    const loginResult = {
      userId: "string",
      accessToken: "string",
      expiresOn: "string",
    };

    beforeEach(() => {
      authApiMock.login.mockResolvedValue({
        isSuccess: true,
        statusCode: 200,
        result: loginResult,
      });
    });

    it("should set credentials after successful login", async () => {
      // Act
      const { result } = renderHook(() => useLogin(), { wrapper });
      await act(async () => {
        await result.current.login(loginInput);
      });

      // Assert
      await waitFor(() => {
        expect(setCredentialsFn).toHaveBeenCalledWith(loginResult);
      });
    });

    it("should broadcast token after successful login", async () => {
      // Act
      const { result } = renderHook(() => useLogin(), { wrapper });
      await act(async () => {
        await result.current.login(loginInput);
      });

      // Assert
      await waitFor(() => {
        expect(postTokenGeneratedBroadcast).toHaveBeenCalledWith(loginResult);
      });
    });

    it("should navigate to home after successful login", async () => {
      // Act
      const { result } = renderHook(() => useLogin(), { wrapper });
      await act(async () => {
        await result.current.login(loginInput);
      });

      // Assert
      await waitFor(() => {
        expect(navigateFn).toHaveBeenCalledWith(ROUTES.HOME);
      });
    });
  });

  describe("when the API call fails", () => {
    const loginInput = { email: "email", password: "password" };
    const errorMessage = "Invalid credentials";

    beforeEach(() => {
      authApiMock.login.mockResolvedValue({
        isSuccess: false,
        statusCode: 401,
        errors: [{ message: errorMessage }],
      });
    });

    it("should not set credentials when login fails", async () => {
      // Act
      const { result } = renderHook(() => useLogin(), { wrapper });
      await act(async () => {
        await result.current.login(loginInput);
      });

      // Assert
      await waitFor(() => {
        expect(setCredentialsFn).not.toHaveBeenCalled();
      });
    });

    it("should not broadcast token when login fails", async () => {
      // Act
      const { result } = renderHook(() => useLogin(), { wrapper });
      await act(async () => {
        await result.current.login(loginInput);
      });

      // Assert
      await waitFor(() => {
        expect(postTokenGeneratedBroadcast).not.toHaveBeenCalled();
      });
    });

    it("should not navigate to home when login fails", async () => {
      // Act
      const { result } = renderHook(() => useLogin(), { wrapper });
      await act(async () => {
        await result.current.login(loginInput);
      });

      // Assert
      await waitFor(() => {
        expect(navigateFn).not.toHaveBeenCalled();
      });
    });

    it("should set error message when login fails", async () => {
      // Arrange: override to throw error
      authApiMock.login.mockImplementation(() => {
        throw new Error(errorMessage);
      });
      const { result } = renderHook(() => useLogin(), { wrapper });
      await act(async () => {
        await result.current.login(loginInput);
      });
      // Assert
      await waitFor(() => {
        expect(result.current.error).not.toBeNull();
        expect(typeof result.current.error).toBe("object");
      });
    });
  });
});
