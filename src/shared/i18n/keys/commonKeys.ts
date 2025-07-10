export const COMMON_KEYS = {
  loading: "loading",
  saving: "saving",
  sending: "sending",
  errors: {
    error: "errors.error",
    unauthorized: "errors.unauthorized",
    forbidden: "errors.forbidden",
    unexpected: "errors.unexpected",
    tryAgain: "errors.tryAgain",
  },
  pagination: {
    previous: "pagination.previous",
    next: "pagination.next",
    page: "pagination.page",
    of: "pagination.of",
  },
  filters: {
    title: "filters.title",
    search: "filters.search",
    searchPlaceholder: "filters.searchPlaceholder",
    sortBy: "filters.sortBy",
    sortByPlaceholder: "filters.sortByPlaceholder",
    order: "filters.order",
    orderPlaceholder: "filters.orderPlaceholder",
    ascending: "filters.ascending",
    descending: "filters.descending",
    clearAll: "filters.clearAll",
    expandFilters: "filters.expandFilters",
    collapseFilters: "filters.collapseFilters",
    activeFilters: "filters.activeFilters",
  },
  actions: {
    view: "actions.view",
    edit: "actions.edit",
    delete: "actions.delete",
    viewDetails: "actions.viewDetails",
  },
  delete: {
    button: "delete.button",
    deleting: "deleting",
  },
  cancel: {
    button: "cancel.button",
  },
  confirm: {
    text: "confirm.text",
  },
  fields: {
    email: "fields.email",
    emailPlaceholder: "fields.emailPlaceholder",
    password: "fields.password",
    passwordPlaceholder: "fields.passwordPlaceholder",
  },
  gender: {
    male: "gender.male",
    female: "gender.female",
  },
} as const;
