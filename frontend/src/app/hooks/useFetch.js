import { useEffect, useState } from 'react';
import { getGenericErrorMessage } from '../../config/messages/selectors';

const useFetch = (url, fetchOptions = {}, deps = []) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log(url);
      const res = await fetch(url, fetchOptions);
      if (!res.ok) {
        setLoading(false);
        setError(getGenericErrorMessage());
      } else {
        const fetchedData = await res.json();
        setLoading(false);
        setData(fetchedData);
      }
    };

    fetchData();
  }, deps);

  return { loading, data, error };
};

export default useFetch;
