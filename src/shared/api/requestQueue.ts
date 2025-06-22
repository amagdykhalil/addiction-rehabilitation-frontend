import type { ApiResponse } from "../types";

// Queue to store failed requests during refresh
export const requestQueue: Array<() => Promise<ApiResponse<unknown>>> = [];

export const clearQueue = () => {
  requestQueue.length = 0;
};

export const addToQueue = (request: () => Promise<ApiResponse<unknown>>) => {
  requestQueue.push(request);
};

export const retryQueuedRequests = async () => {
  const retryPromises = requestQueue.map((retryRequest) => retryRequest());
  await Promise.all(retryPromises);
  clearQueue();
};
