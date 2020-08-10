declare module 'authorization' {
  import PropTypes from 'prop-types';
  import { IAchievement, AchievementProps } from 'game';

  export interface IUser {
    _id: string;
    token: string;
    firstname: string;
    lastname: string;
    experience: number;
    level: number;
    email: string;
    currentTitle: {
      name: string;
    };
    achievements: IAchievement[];
    image?: string;
    profile_url: string;
    [key: string]: string;
  }

  export const UserProps = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    experience: PropTypes.number.isRequired,
    level: PropTypes.number.isRequired,
    string: PropTypes.string.isRequired,
    image: PropTypes.string,
    profile_url: PropTypes.string.isRequired,
    currentTitle: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    achievements: PropTypes.array(AchievementProps),
  });

  export interface IAuth {
    user: IUser;
    logged: boolean;
    loading: boolean;
    signIn: (user: IUser) => void;
    signOut: () => void;
  }
}
