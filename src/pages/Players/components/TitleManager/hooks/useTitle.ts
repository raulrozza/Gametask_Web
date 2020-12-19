// Hooks
import { useCallback, useEffect, useState } from 'react';
import { useApiGet, useApiPost } from 'hooks';

// Types
import { ITitle } from 'interfaces';
import { UseTitle } from '../types';

// Utils
import { addItemToArray, removeItemFromArray } from 'utils';

const useTitle: UseTitle = () => {
  const [titles, setTitles] = useState<ITitle[]>([]);
  const [loading, setLoading] = useState(true);

  const apiGet = useApiGet<ITitle[]>();
  const apiPost = useApiPost<ITitle>();

  useEffect(() => {
    (async () => {
      const titles = await apiGet('/title');

      setTitles(titles || []);
      setLoading(false);
    })();
  }, [apiGet]);

  const handleAddTitle = useCallback(async () => {
    const title = await apiPost('/title', {
      name: 'Novo título',
    });

    if (title) setTitles(titles => addItemToArray(titles, title));
  }, [apiPost]);

  const deleteCallback = useCallback((id: string) => {
    setTitles(titles => {
      const index = titles.findIndex(title => title._id === id);

      return removeItemFromArray(titles, index);
    });
  }, []);

  return {
    titles,
    loading,
    handleAddTitle,
    deleteCallback,
  };
};

export default useTitle;
