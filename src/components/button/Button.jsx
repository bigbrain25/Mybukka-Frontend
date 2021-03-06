import React from 'react';

import PropTypes from 'prop-types';
import './buttons.scss';

const Button = ({
  type,
  classNames,
  text,
  handleClick,
  children,
  disabled,
  dataTarget,
  dataToggle,
  dataDismiss,
  id,
  onDoubleClick,
}) => (
  <button
    type={type}
    className={classNames}
    onClick={handleClick}
    disabled={disabled}
    data-target={dataTarget}
    data-toggle={dataToggle}
    data-testid="button"
    id={id}
    data-dismiss={dataDismiss}
    onDoubleClick={onDoubleClick}
  >
    {text || children}
  </button>
);

export default Button;

Button.defaultProps = {
  text: '',
  dataTarget: '',
  dataToggle: '',
  dataDismiss: '',
  children: <div />,
  disabled: false,
  onDoubleClick: () => {}
};

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  classNames: PropTypes.string.isRequired,
  text: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  disabled: PropTypes.bool,
  dataTarget: PropTypes.string,
  dataToggle: PropTypes.string,
  dataDismiss: PropTypes.string,
};
