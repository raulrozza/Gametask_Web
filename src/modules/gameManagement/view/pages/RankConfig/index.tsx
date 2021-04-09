import React, { useCallback } from 'react';

// Components
import {
  FieldArray,
  FieldArrayRenderProps,
  Form,
  Formik,
  FormikProps,
} from 'formik';
import { Button, Loading } from 'shared/view/components';
import { AddItemButton } from './components';
import { RemoveButton } from 'styles';
import { Container, RankItem, ColorInput } from './styles';

// Hooks
import useGetGameController from 'modules/dashboard/infra/controllers/useGetGameController';

// Icons
import { FaTimes } from 'react-icons/fa';

// Utils
import { getTextColor } from 'utils/theme';

// Types
import IRank from 'shared/entities/IRank';

interface IRankValues {
  ranks: IRank[];
}

interface FieldArrayProps extends FieldArrayRenderProps {
  form: FormikProps<IRankValues>;
}

const RankConfig: React.FC = () => {
  const { game, loading } = useGetGameController();

  const handleRemoveItem = useCallback(() => undefined, []);

  const handleSelectChange = useCallback(() => undefined, []);

  const handleChangeItem = useCallback(() => undefined, []);

  const handleColorChange = useCallback(() => undefined, []);

  if (loading) return <Loading />;

  return (
    <Container>
      <h2>Configurar patentes</h2>

      <p>
        Crie, edite e remova patentes. Defina uma cor e a partir de qual nível
        um jogador a obtém.
      </p>

      <Formik
        initialValues={{ ranks: game.ranks || [] } as IRankValues}
        onSubmit={values => console.log(values)}
      >
        <Form>
          <FieldArray name="ranks">
            {(props: FieldArrayProps) => (
              <>
                {props.form.values.ranks.map((rank, index) => {
                  const textColor = getTextColor(
                    rank.color || game.theme.primary,
                  );

                  return (
                    <RankItem
                      key={`${index}-${rank.level}`}
                      backgroundColor={rank.color || 'transparent'}
                      textColor={textColor}
                    >
                      <RemoveButton
                        type="button"
                        title="Remover"
                        /* onClick={() => handleRemoveItem(index)} */
                      >
                        <FaTimes />
                      </RemoveButton>
                      <div className="select">
                        <label htmlFor="level">Nível: </label>

                        <select
                          name="level"
                          value={rank.level}
                          /* onBlur={({ target }) =>
                        handleSelectChange(target.value, index)
                      } */
                        >
                          {game.levelInfo?.map(info => (
                            <option value={info.level} key={info.level}>
                              {info.level}
                            </option>
                          ))}
                        </select>
                      </div>

                      <input
                        type="text"
                        placeholder="Tag"
                        className="tag"
                        name="tag"
                        value={rank.tag}
                        /* onChange={({ target }) => handleChangeItem(target, index)} */
                      />

                      <input
                        type="text"
                        placeholder="Nome da patente"
                        className="name"
                        name="name"
                        value={rank.name}
                        /* onChange={({ target }) => handleChangeItem(target, index)} */
                      />

                      <ColorInput
                        value={rank.color}
                        onChange={() => undefined}
                        /* onChange={color => handleColorChange(color.hex, index)} */
                      />
                    </RankItem>
                  );
                })}

                <AddItemButton handlePush={props.push} />
              </>
            )}
          </FieldArray>

          <footer>
            <Button type="submit" loading={false}>
              Salvar
            </Button>
          </footer>
        </Form>
      </Formik>
    </Container>
  );
};

export default RankConfig;
