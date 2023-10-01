import { useCallback, useState } from 'react';
import { getResponseError } from '../utility/data-fetching/get-response-error';
import { getGenericErrorMessage } from '../../config/messages/selectors';

const defaultPostingHeaders = { 'Content-Type': 'application/json' };
const defaultErrorParser = (e) => getGenericErrorMessage();

const useFetch = (initialUrl = '/') => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

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

  const parseResponseData = useCallback((res) => {
    if (Array.isArray(res)) {
      return Promise.all(res.map((subRes) => subRes.json()));
    }
    return res.json();
  }, []);

  const executeFetch = useCallback(
    async (fetchMethod, errorParser) => {
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
    },
    [isResponseOk, parseResponseData]
  );

  const get = useCallback(
    ({ url = initialUrl, errorParser = defaultErrorParser, extraHeaders = {} } = {}) => {
      executeFetch(() => fetch(url, { headers: extraHeaders }), errorParser);
    },
    [initialUrl, executeFetch]
  );

  const getMany = useCallback(
    (urls, { errorParser = defaultErrorParser, extraHeaders = {} } = {}) => {
      executeFetch(
        () => Promise.all(urls.map((url) => fetch(url, { headers: extraHeaders }))),
        errorParser
      );
    },
    [executeFetch]
  );

  const post = useCallback(
    (
      json,
      { url = initialUrl, errorParser = defaultErrorParser, extraHeaders = {} } = {}
    ) => {
      executeFetch(
        () =>
          fetch(url, {
            method: 'POST',
            headers: { ...defaultPostingHeaders, ...extraHeaders },
            body: JSON.stringify(json),
          }),
        errorParser
      );
    },
    [initialUrl, executeFetch]
  );

  const put = useCallback(
    (
      json,
      { url = initialUrl, errorParser = defaultErrorParser, extraHeaders = {} } = {}
    ) => {
      executeFetch(
        () =>
          fetch(url, {
            method: 'PUT',
            headers: { ...defaultPostingHeaders, ...extraHeaders },
            body: JSON.stringify(json),
          }),
        errorParser
      );
    },
    [initialUrl, executeFetch]
  );

  const del = useCallback(
    ({ url = initialUrl, errorParser = defaultErrorParser, extraHeaders = {} } = {}) => {
      executeFetch(
        () => fetch(url, { method: 'DELETE', headers: extraHeaders }),
        errorParser
      );
    },
    [initialUrl, executeFetch]
  );

  return { data, error, loading, reset, get, getMany, post, put, del };
};

export default useFetch;
