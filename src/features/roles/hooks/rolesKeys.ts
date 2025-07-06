export const rolesKeys = {
  all: ["roles"] as const,
  lists: () => [...rolesKeys.all, "list"] as const,
  list: (filter?: Record<string, unknown>, locale?: string) =>
    locale
      ? ([...rolesKeys.lists(), { filter }, locale] as const)
      : ([...rolesKeys.lists(), { filter }] as const),
  details: () => [...rolesKeys.all, "detail"] as const,
  detail: (id: number, locale?: string) =>
    locale
      ? ([...rolesKeys.details(), { id, locale }] as const)
      : ([...rolesKeys.details(), { id }] as const),
};
