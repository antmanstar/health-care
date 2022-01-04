import React, { Component } from 'react';
import styled from 'styled-components';

//  Regular sized negative button for onboarding - looks like grayed text

const BaseButton = styled.button`
  background: ${props => props.theme.gradients.main};
  color: ${props => props.theme.colors.shades.white};
  height: 48px;
  padding: 0 32px;
  border: none;
  border-radius: 4px;
  font-weight: 400;
  font-size: 16px;
  text-transform: uppercase;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    background: #345d74;
  }

  &:focus {
    outline: none;
  }
`;

const NegButton = styled(BaseButton)`
  font-weight: 700;
  background: none;
  color: ${props => props.theme.colors.shades.pinkRed};
  opacity: 0.6;
  box-shadow: none;
  &:hover {
    opacity: 1;
    background: none;
  }
`;

class NegativeButton extends Component {
  render() {
    return <NegButton>{this.props.text}</NegButton>;
  }
}

export default NegativeButton;
