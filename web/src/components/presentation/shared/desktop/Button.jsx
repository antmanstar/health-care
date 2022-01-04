import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const BaseButton = styled.button`
  background: ${props => props.theme.colors.shades.tealBlue};
  color: ${props => props.theme.colors.shades.white};
  height: 48px;
  padding: 0 32px;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  font-size: 16px;
  letter-spacing: 1.25px;
  text-transform: uppercase;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    background: #345d74;
  }

  &:focus {
    outline: none;
  }

  &.negative {
    background: none;
    color: ${props => props.theme.colors.shades.gray};
    opacity: 0.6;
    box-shadow: none;
    &:hover {
      opacity: 1;
      background: none;
    }
  }
`;

const Button = React.memo(({ text, type, buttonType, ...props }) => (
  <BaseButton className={type} type={buttonType} {...props}>
    {text}
  </BaseButton>
));

Button.propTypes = {
  text: PropTypes.string.isRequired,
  buttonType: PropTypes.string,
  type: PropTypes.oneOf(['action', 'negative'])
};

Button.defaultProps = {
  type: 'action',
  buttonType: 'button'
};

export default Button;
