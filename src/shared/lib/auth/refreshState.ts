interface RefreshState {
  isRefreshing: boolean;
  refreshStartTime: number | null;
}

const REFRESH_LOCK_TIMEOUT =
  Number(import.meta.env.VITE_REFRESH_LOCK_TIMEOUT) || 10000; // 10 seconds

const refreshState: RefreshState = {
  isRefreshing: false,
  refreshStartTime: null,
};

export const setRefreshing = (isRefreshing: boolean) => {
  refreshState.isRefreshing = isRefreshing;
  refreshState.refreshStartTime = isRefreshing ? Date.now() : null;
};

export const isTokenRefreshing = () => {
  if (!refreshState.isRefreshing || !refreshState.refreshStartTime)
    return false;

  const now = Date.now();
  const isLocked = now - refreshState.refreshStartTime < REFRESH_LOCK_TIMEOUT;

  if (!isLocked) {
    setRefreshing(false);
    return false;
  }
  return true;
};
