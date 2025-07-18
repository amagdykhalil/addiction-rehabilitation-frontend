import { screen, renderHook } from "../../../../__tests__/test-utils";

import { useAuthInitializer } from "./useAuthInitializer";
import { useAuth } from "@/entities/auth/model/useAuth";
import { refreshToken } from "@/shared/api";
import * as authGoTo from "@/shared/lib/auth/auth";
import { render } from "@testing-library/react";
import { Suspense } from "react";
import { resetAuthInitializerPromiseState } from "@/features/auth/models/AutoLogin";

vi.mock("@/entities/auth/model/useAuth");
vi.mock("@/shared/lib/auth/auth");
vi.mock("@/shared/api");
vi.spyOn(authGoTo, "isAtLoginPage");

describe("useAuthInitializer", () => {
  const useAuthMock = vi.mocked(useAuth);
  const goToHomeMock = vi.mocked(authGoTo.goToHome);
  const refreshTokenMock = vi.mocked(refreshToken);
  const isAtLoginPageMock = vi.mocked(authGoTo.isAtLoginPage);

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    resetAuthInitializerPromiseState();
  });

  it("should return null if already initialized", () => {
    // Arrange

    useAuthMock.mockReturnValue({
      authData: null,
      setCredentials: vi.fn(),
      logout: vi.fn(),
      isAuthenticated: false,
    });

    // Act
    const { result } = renderHook(() => useAuthInitializer());

    // Assert
    expect(result.current).toBeNull();
  });

  it("should schedule refresh and go home if authData is valid and at login page", () => {
    // Arrange
    useAuthMock.mockReturnValue({
      authData: {
        userId: "id",
        accessToken: "token",
        expiresOn: new Date(Date.now() + 10000).toISOString(),
      },
      setCredentials: vi.fn(),
      logout: vi.fn(),
      isAuthenticated: true,
    });
    isAtLoginPageMock.mockReturnValue(true);
    goToHomeMock.mockReturnValue(undefined as unknown as "/");

    // Act
    renderHook(() => useAuthInitializer());

    // Assert
    expect(vi.getTimerCount()).toBeGreaterThan(0);
    expect(goToHomeMock).toHaveBeenCalled();
  });

  function TestComponentNotReady() {
    useAuthInitializer();
    return <div>Initializer</div>;
  }

  it("should render suspense if authData is invalid and new token is not ready", async () => {
    //Arrange
    useAuthMock.mockReturnValue({
      authData: {
        userId: "id",
        accessToken: "token",
        expiresOn: new Date(2025, 1, 10).toISOString(),
      },
      setCredentials: vi.fn(),
      logout: vi.fn(),
      isAuthenticated: true,
    });
    refreshTokenMock.mockReturnValue(new Promise(() => {}));

    //Act
    render(
      <Suspense fallback="Suspended">
        <TestComponentNotReady />
      </Suspense>,
    );

    //Assert
    screen.debug();
    expect(screen.getByText("Suspended")).toBeInTheDocument();
  });

  it("should schedule timer with correct msUntilThreshold", () => {
    // Arrange
    const threshold = 5000;
    const expiresOn = new Date(Date.now() + 20000).toISOString();
    const oldEnv = import.meta.env.APP_TOKEN_REFRESH_THRESHOLD;
    import.meta.env.APP_TOKEN_REFRESH_THRESHOLD = threshold;
    useAuthMock.mockReturnValue({
      authData: {
        userId: "id",
        accessToken: "token",
        expiresOn,
      },
      setCredentials: vi.fn(),
      logout: vi.fn(),
      isAuthenticated: true,
    });
    isAtLoginPageMock.mockReturnValue(false);

    // Act
    renderHook(() => useAuthInitializer());

    // Assert
    expect(vi.getTimerCount()).toBe(1);
    // Clean up
    import.meta.env.APP_TOKEN_REFRESH_THRESHOLD = oldEnv;
  });

  it("should handle refreshToken failure and log error", async () => {
    // Arrange
    useAuthMock.mockReturnValue({
      authData: null,
      setCredentials: vi.fn(),
      logout: vi.fn(),
      isAuthenticated: false,
    });
    const error = new Error("refresh failed");
    refreshTokenMock.mockRejectedValue(error);
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    // Act
    renderHook(() => useAuthInitializer());
    await Promise.resolve(); // flush microtasks

    // Assert
    expect(errorSpy).toHaveBeenCalledWith("Token refresh failed:", error);
    errorSpy.mockRestore();
  });

  it("should schedule next refresh and go home after successful refresh", async () => {
    // Arrange
    const newAuth = {
      userId: "id",
      accessToken: "token",
      expiresOn: new Date(Date.now() + 30000).toISOString(),
    };
    useAuthMock.mockReturnValue({
      authData: null,
      setCredentials: vi.fn(),
      logout: vi.fn(),
      isAuthenticated: false,
    });
    refreshTokenMock.mockResolvedValue(newAuth);
    isAtLoginPageMock.mockReturnValue(true);
    goToHomeMock.mockReturnValue(undefined as unknown as "/");

    // Act
    renderHook(() => useAuthInitializer());
    await Promise.resolve(); // flush microtasks

    // Assert
    expect(goToHomeMock).toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(1);
  });
});
