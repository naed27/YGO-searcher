
const elementCache: Record<string, HTMLElement> = {};

export const getFromElementCache = (key: string): HTMLElement | undefined => {
  return elementCache[key];
};

export const setInElementCache = (key: string, value: any) => {
  elementCache[key] = value;
};