import React from 'react';
import styled from 'styled-components';

// MOBILE - Reward Notice for Partner Programs view on mobile

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0;
  padding: 0 16px;
  background: ${props => props.theme.colors.roles.success};
  color: ${props => props.theme.colors.shades.white};
  box-sizing: border-box;

  > * {
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  }

  i {
    margin: 0 12px 2px 0;
  }

  p {
    font-weight: 400;
    font-size: 14px;
  }
`;

const RewardNotice = React.memo(() => (
  <Wrapper>
    <i className="material-icons">redeem</i>
    <p>Completing programs earns you extra rewards</p>
  </Wrapper>
));

export default RewardNotice;
