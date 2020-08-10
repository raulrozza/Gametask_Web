import React, { FormHTMLAttributes } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const Form: React.FC<FormHTMLAttributes<HTMLFormElement>> = ({
  children,
  ...props
}) => {
  return (
    <form className="form" {...props}>
      {children}
    </form>
  );
};

Form.propTypes = {
  children: PropTypes.node,
};

export default Form;
