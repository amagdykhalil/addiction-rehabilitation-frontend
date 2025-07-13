import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { authApi } from "@/entities/auth/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/entities/auth/model/useAuth";
import { useLogout } from "./useLogout";
import { act, renderHook, waitFor } from "../../../../__tests__/test-utils";
import { postLogoutBroadcast } from "@/shared/lib/broadcasts/authBroadcasts";
import { ROUTES } from "@/shared/routes";

// Mock paths
vi.mock("@/entities/auth/api");
vi.mock("react-router-dom");
vi.mock("@/entities/auth/model/useAuth");
vi.mock("@/shared/lib/broadcasts/authBroadcasts");

describe("useLogout", () => {
  // Shared mocks
  const authApiMock = vi.mocked(authApi);
  const useNavigateMock = vi.mocked(useNavigate);
  const useAuthMock = vi.mocked(useAuth);

  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  let navigateFn: ReturnType<typeof vi.fn>;
  let logoutFn: ReturnType<typeof vi.fn>;
  let clearFn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient.clear();

    navigateFn = vi.fn();
    useNavigateMock.mockReturnValue(navigateFn);

    logoutFn = vi.fn();
    useAuthMock.mockReturnValue({
      authData: null,
      setCredentials: vi.fn(),
      logout: logoutFn,
      isAuthenticated: false,
    });

    // Spy on queryClient.clear
    clearFn = vi.spyOn(queryClient, "clear");
  });

  describe("when the API call is successful", () => {
    beforeEach(() => {
      authApiMock.logout.mockResolvedValue({
        isSuccess: true,
        statusCode: 200,
      });
    });

    it("should call logout on success", async () => {
      const { result } = renderHook(() => useLogout(), { wrapper });
      await act(async () => {
        await result.current.logout();
      });
      await waitFor(() => {
        expect(logoutFn).toHaveBeenCalled();
      });
    });

    it("should broadcast logout on success", async () => {
      const { result } = renderHook(() => useLogout(), { wrapper });
      await act(async () => {
        await result.current.logout();
      });
      await waitFor(() => {
        expect(postLogoutBroadcast).toHaveBeenCalled();
      });
    });

    it("should clear queryClient on success", async () => {
      const { result } = renderHook(() => useLogout(), { wrapper });
      await act(async () => {
        await result.current.logout();
      });
      await waitFor(() => {
        expect(clearFn).toHaveBeenCalled();
      });
    });

    it("should navigate to login on success", async () => {
      const { result } = renderHook(() => useLogout(), { wrapper });
      await act(async () => {
        await result.current.logout();
      });
      await waitFor(() => {
        expect(navigateFn).toHaveBeenCalledWith(ROUTES.LOGIN);
      });
    });
  });

  describe("when the API call fails", () => {
    beforeEach(() => {
      authApiMock.logout.mockRejectedValue(new Error("Logout failed"));
    });

    it("should not call logout on failure", async () => {
      const { result } = renderHook(() => useLogout(), { wrapper });
      await act(async () => {
        await result.current.logout();
      });
      await waitFor(() => {
        expect(logoutFn).not.toHaveBeenCalled();
      });
    });

    it("should not broadcast logout on failure", async () => {
      const { result } = renderHook(() => useLogout(), { wrapper });
      await act(async () => {
        await result.current.logout();
      });
      await waitFor(() => {
        expect(postLogoutBroadcast).not.toHaveBeenCalled();
      });
    });

    it("should not clear queryClient on failure", async () => {
      const { result } = renderHook(() => useLogout(), { wrapper });
      await act(async () => {
        await result.current.logout();
      });
      await waitFor(() => {
        expect(clearFn).not.toHaveBeenCalled();
      });
    });

    it("should not navigate to login on failure", async () => {
      const { result } = renderHook(() => useLogout(), { wrapper });
      await act(async () => {
        await result.current.logout();
      });
      await waitFor(() => {
        expect(navigateFn).not.toHaveBeenCalled();
      });
    });
  });
});
