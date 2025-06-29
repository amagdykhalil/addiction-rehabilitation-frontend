export const patientsKeys = {
  all: ["patients"] as const,
  lists: () => [...patientsKeys.all, "list"] as const,
  list: (filter?: Record<string, unknown>, locale?: string) =>
    locale
      ? ([...patientsKeys.lists(), { filter }, locale] as const)
      : ([...patientsKeys.lists(), { filter }] as const),
  details: () => [...patientsKeys.all, "detail"] as const,
  detail: (id: string, locale?: string) =>
    locale
      ? ([...patientsKeys.details(), { id, locale }] as const)
      : ([...patientsKeys.details(), { id }] as const),
  countries: () => ["countries"] as const,
};
