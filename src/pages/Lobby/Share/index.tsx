import React from 'react';
import PropTypes from 'prop-types';

import crypto from 'crypto-js';

// Icons
import { MdContentCopy } from 'react-icons/md';

// Styles
import { Container } from './styles';

// Types
import { IShare } from '../types';
import { useAuth } from '../../../contexts/Authorization';

const Share: React.FC<IShare> = ({ gameId }) => {
  const { user } = useAuth();
  const SECRET = process.env.REACT_APP_JWT_SECRET || '';

  const cipher = crypto.AES.encrypt(
    JSON.stringify({ gameId, inviter: user._id }),
    SECRET,
  ).toString();

  console.log(cipher);

  console.log(
    JSON.parse(crypto.AES.decrypt(cipher, SECRET).toString(crypto.enc.Utf8)),
  );

  return <Container>Compartilhando</Container>;
};

Share.propTypes = {
  gameId: PropTypes.string.isRequired,
};

export default Share;
