function getSearchParams(params: URLSearchParams): { [key: string]: string[] } {
  const result: { [key: string]: string[] } = {};

  params.forEach((value, key) => {
    if (result[key]) {
      result[key].push(value);
    } else {
      result[key] = [value];
    }
  });

  return result;
}

export default getSearchParams;
