import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// MOBILE - Mobile Action Button

const Wrapper = styled.button`
  width: 100%;
  margin: 0 auto;
  border: 0;
  outline: 0;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1.25px;
  text-transform: uppercase;
  box-sizing: border-box;
  cursor: pointer;

  &.action {
    font-weight: 500;
    background: ${props => props.theme.gradients.main};
    color: ${props => props.theme.colors.shades.white};
  }
  &.inverse {
    background: ${props => props.theme.colors.shades.white};
    color: ${props => props.theme.colors.shades.blue};
  }
  &.negative {
    background: ${props => props.theme.colors.shades.white};
    color: ${props => props.theme.colors.roles.danger};
  }
  &.success {
    font-weight: 500;
    background: ${props => props.theme.colors.roles.success};
    color: ${props => props.theme.colors.shades.white};
  }
  &.negative-transparent {
    font-weight: 500;
    background: transparent;
    color: ${props => props.theme.colors.shades.white};
    box-shadow: none;
  }

  &:last-child {
    margin-bottom: 0;
  }

  &.small {
    width: auto;
    margin: 0;
    padding: 6px 12px;
    font-size: 13px;
    letter-spacing: 0;
    font-weight: 700;
  }
`;

const MobileActionButton = React.memo(
  ({ text, type, size, onClick, onKey, buttonType, className }) => (
    <Wrapper
      tabIndex="0"
      onKeyDown={onKey || onClick}
      onClick={onClick}
      className={`${type} ${size} ${className}`}
      type={buttonType}
    >
      {text}
    </Wrapper>
  )
);

MobileActionButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onKey: PropTypes.func,
  buttonType: PropTypes.string,
  type: PropTypes.oneOf(['action', 'negative', 'success', 'inverse', 'negative-transparent'])
    .isRequired,
  size: PropTypes.oneOf(['small', '']),
  className: PropTypes.string
};

MobileActionButton.defaultProps = {
  buttonType: 'button',
  onKey: undefined,
  size: '',
  className: ''
};

export default MobileActionButton;
