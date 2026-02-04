import { useMemo } from 'react';

export const useUrlParams = () => {
  const params = useMemo(() => {
    const searchParams = new URLSearchParams(window.location.search);
    return {
      name: searchParams.get('name') || '',
    };
  }, []);

  return params;
};
