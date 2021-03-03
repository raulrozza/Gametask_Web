import React, { useCallback, useState } from 'react';

// Hooks
import { useApiPost } from 'hooks/api/useApiPost';
import { useApiGet } from 'hooks/api/useApiGet';

// Libs
import lodash from 'lodash';

// Styles
import { TitleOptions } from './styles';

// Types
import { ITitle } from 'interfaces/api/Title';

// Utils
import { getTitleParams } from './utils';

interface TitleInputProps {
  showOptions: boolean;
  inputValue: string;
  setTitleState: (title: ITitle | null) => void;
  setFormValue: (value: string) => void;
  setShowTitleList: (value: boolean) => void;
}

const TitleInput: React.FC<TitleInputProps> = ({
  showOptions,
  inputValue,
  setTitleState,
  setFormValue,
  setShowTitleList,
}) => {
  const [titleList, setTitleList] = useState<ITitle[]>([]);

  const apiGet = useApiGet<ITitle[]>();
  const apiPost = useApiPost<ITitle>();

  const getTitleFromAPI = useCallback(
    lodash.debounce(async (value: string) => {
      const params = getTitleParams(value);

      const response = await apiGet('/title', {
        params,
      });

      if (response !== null) setTitleList(response);
      else setTitleState(null);
    }, 500),
    [],
  );

  const addTitle = useCallback(
    async (name: string) => {
      const response = await apiPost('/title', {
        name,
      });

      if (response) {
        setTitleState(response);
        setShowTitleList(false);
      }
    },
    [apiPost, setShowTitleList, setTitleState],
  );

  const setTitleValue = useCallback(
    (value: string) => {
      setFormValue(value);
      getTitleFromAPI(value);
    },
    [getTitleFromAPI, setFormValue],
  );

  return (
    <>
      <input
        type="text"
        name="title"
        placeholder="Sua conquista dará um título?"
        onChange={event => setTitleValue(event.target.value)}
        value={inputValue}
      />

      <TitleOptions visible={showOptions}>
        {titleList && titleList.length > 0 && (
          <ul>
            {titleList.map(title => (
              <li
                key={title._id}
                onClick={() => {
                  setTitleState(title);
                  setFormValue(title.name);
                  setShowTitleList(false);
                }}
              >
                {title.name}
              </li>
            ))}
          </ul>
        )}

        {titleList && titleList.length === 0 && (
          <button type="button" onClick={() => addTitle(inputValue)}>
            Adicionar título: {inputValue}
          </button>
        )}
      </TitleOptions>
    </>
  );
};

export default TitleInput;
