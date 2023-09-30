import { useCallback, useState } from 'react';
import { getResponseError } from '../utility/data-fetching/getResponseError';
import { getGenericErrorMessage } from '../../config/messages/selectors';

const defaultPostingHeaders = { 'Content-Type': 'application/json' };
const defaultErrorParser = (e) => getGenericErrorMessage();

const useFetch = (initialUrl = '/') => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  const executeFetch = async (fetchMethod, errorParser) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchMethod();
      if (!isResponseOk(res)) {
        throw await getResponseError(res);
      }
      const data = await parseResponseData(res);
      setData(data);
    } catch (error) {
      setError(await errorParser(error));
    } finally {
      setLoading(false);
    }
  };

  const isResponseOk = useCallback((res) => {
    if (Array.isArray(res)) {
      for (const subRes of res) {
        if (!subRes.ok) {
          return false;
        }
      }
      return true;
    }
    return res.ok;
  }, []);

  const parseResponseData = useCallback(async (res) => {
    if (Array.isArray(res)) {
      return await Promise.all(res.map((subRes) => subRes.json()));
    }
    return await res.json();
  }, []);

  const get = useCallback(
    async ({
      url = initialUrl,
      errorParser = defaultErrorParser,
      extraHeaders = {},
    } = {}) => {
      await executeFetch(
        async () => await fetch(url, { headers: extraHeaders }),
        errorParser
      );
    },
    [initialUrl]
  );

  const getMany = useCallback(
    async (urls, { errorParser = defaultErrorParser, extraHeaders = {} } = {}) => {
      await executeFetch(
        async () =>
          await Promise.all(urls.map((url) => fetch(url, { headers: extraHeaders }))),
        errorParser
      );
    },
    [initialUrl]
  );

  const post = useCallback(
    async (
      json,
      { url = initialUrl, errorParser = defaultErrorParser, extraHeaders = {} } = {}
    ) => {
      executeFetch(
        async () =>
          await fetch(url, {
            method: 'POST',
            headers: { ...defaultPostingHeaders, ...extraHeaders },
            body: JSON.stringify(json),
          }),
        errorParser
      );
    },
    [initialUrl]
  );

  const put = useCallback(
    async (
      json,
      { url = initialUrl, errorParser = defaultErrorParser, extraHeaders = {} } = {}
    ) => {
      executeFetch(
        async () =>
          await fetch(url, {
            method: 'PUT',
            headers: { ...defaultPostingHeaders, ...extraHeaders },
            body: JSON.stringify(json),
          }),
        errorParser
      );
    },
    [initialUrl]
  );

  const del = useCallback(
    async ({
      url = initialUrl,
      errorParser = defaultErrorParser,
      extraHeaders = {},
    } = {}) => {
      executeFetch(
        async () => await fetch(url, { method: 'DELETE', headers: extraHeaders }),
        errorParser
      );
    },
    [initialUrl]
  );

  return { data, error, loading, reset, get, getMany, post, put, del };
};

export default useFetch;
