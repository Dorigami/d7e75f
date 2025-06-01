import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [queryData, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      fetch(url)
      .then(response => {
        if (!response.ok) { 
          // error coming back from server
          throw Error('could not fetch the queryData for that resource');
        } 
        return response.json();
      })
      .then(queryData => {
        setIsLoading(false);
        setData(queryData);
        setError(null);
      })
      .catch(err => {
        setIsLoading(false);
        setError(err.message);
      })
  }, [url])

  return { queryData, isLoading, error };
}

export default useFetch;