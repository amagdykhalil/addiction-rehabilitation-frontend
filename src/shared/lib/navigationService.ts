// src/shared/lib/navigationService.ts
let navigateFunction: ((path: string) => void) | null = null;

export const setNavigateFunction = (navigate: (path: string) => void) => {
  navigateFunction = navigate;
};

export const navigateTo = (path: string) => {
  
  if (navigateFunction) {
    navigateFunction(path);
  } else {
    // Fallback to window.location if navigate function not set
    window.location.href = path;
  }
};
