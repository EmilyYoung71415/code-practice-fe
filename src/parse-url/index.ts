// const queryString = "?data1=bar&data2=test";
// const queryParams = parseQueryParams(queryString); // {data1: bar, data2: test}

function parseQueryParams(queryString: string): Record<string, string> {
  const params = new URLSearchParams(queryString);
  const result: Record<string, string> = {};

  for (const [key, value] of params.entries()) {
    result[key] = value;
  }

  return result;
}
