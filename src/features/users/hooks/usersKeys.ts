export const usersKeys = {
  all: ["users"] as const,
  lists: () => [...usersKeys.all, "list"] as const,
  list: (filter?: Record<string, unknown>, locale?: string) =>
    locale
      ? ([...usersKeys.lists(), { filter }, locale] as const)
      : ([...usersKeys.lists(), { filter }] as const),
  details: () => [...usersKeys.all, "detail"] as const,
  detail: (id: string, locale?: string) =>
    locale
      ? ([...usersKeys.details(), { id, locale }] as const)
      : ([...usersKeys.details(), { id }] as const),
};