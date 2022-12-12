import { ApiFetcherOptions, ApiFetcherResults } from '@common/types/api';

type FetcherParams = {
  query: string;
};

type FetcherResult<T> = { data: T };

const fetchApi = async <T>({
  url,
  query
}: ApiFetcherOptions): Promise<ApiFetcherResults<T>> => {
  const res = await fetch(url!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  });
  const { data, errors } = await res.json();
  if (errors) {
    throw new Error(errors[0].message ?? errors.message);
  }
  return { data };
};

export default fetchApi;
