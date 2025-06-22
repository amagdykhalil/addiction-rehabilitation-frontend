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
    });
    refreshTokenMock.mockReturnValue(new Promise(() => {}));

    //Act
    render(
      <Suspense fallback="Suspended">
        <TestComponentNotReady />
      </Suspense>
    );

    //Assert
    screen.debug();
    expect(screen.getByText("Suspended")).toBeInTheDocument();
  });
});
