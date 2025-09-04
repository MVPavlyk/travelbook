export type FormState<TData = unknown> = {
  errors?: Record<string, string>;
  values?: Record<string, string>;
  serverError?: string;
  ok?: boolean;
  data?: TData;
};
