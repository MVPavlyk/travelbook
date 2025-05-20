export default function buildQueryParams(
  params: Record<string, string | string[] | undefined>
): string {
  if (!params || Object.keys(params).length === 0) return '';

  const queryParams = new URLSearchParams();

  Object.keys(params).forEach((key) => {
    const value = params[key];

    if (value) {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          queryParams.append(key, item);
        });
      } else {
        queryParams.set(key, value);
      }
    }
  });

  return `?${queryParams.toString()}`;
}
