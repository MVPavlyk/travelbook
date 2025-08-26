export type FormState = {
  errors?: Record<string, string>;
  values?: Record<string, string>;
  serverError?: string;
  ok?: boolean;
};
