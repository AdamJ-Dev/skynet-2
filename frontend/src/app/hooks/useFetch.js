import { useEffect, useState } from 'react';
import { getGenericErrorMessage } from '../../config/messages/selectors';

const useFetch = (url, fetchOptions = {}, deps = []) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  console.log(url)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, fetchOptions);
        if (!res.ok) {
          setLoading(false);
          setError(getGenericErrorMessage());
        } else {
          const fetchedData = await res.json();
          setLoading(false);
          setData(fetchedData);
        }
      } catch {
        setLoading(false);
        setError(getGenericErrorMessage())
      }
    };

    fetchData();
  }, deps);

  return { loading, data, error };
};

export default useFetch;
