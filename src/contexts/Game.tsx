import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Contexts
import { useAuth } from './Authorization';

import api from '../services/api';
import setTheme from '../utils/setTheme';
import { IGameHook, IGame } from 'game';
import { IUser } from 'authorization';

const GameContext = createContext({});

const Game: React.FC = ({ children }) => {
  const [game, setGame] = useState<IGame>({} as IGame);
  const [loading, setLoading] = useState(true);
  const { signOut } = useAuth();

  useEffect(() => {
    (async () => {
      try{
        const {data: game} = await api.get('/game/5ebc0a1e1da3fa28f4a455a7');

        api.defaults.headers['X-Game-ID'] = '5ebc0a1e1da3fa28f4a455a7';
        setGame(game);
        setTheme(game.theme);
        setLoading(false);
      }
      catch(error){
        console.error(error);
        if(!error.response)
          return;
        const { response: { data } } = error;

        if(data.error === "TokenExpiredError: jwt expired"){
          signOut();
        }
      }
    })();
  }, [signOut]);

  const getPlayerRank = (player: IUser) => {
    const level = player.level;

    return game.ranks
    .sort((a, b) => b.level - a.level)
    .find(info => level >= info.level);
  }

  return (
    <GameContext.Provider value={{ game, loading, getPlayerRank }} >
      {children}
    </GameContext.Provider>
  )
};

export const useGame = () => {
  const game = useContext(GameContext) as IGameHook;

  return game;
};

Game.propTypes = {
  children: PropTypes.node,
};

export default Game;
