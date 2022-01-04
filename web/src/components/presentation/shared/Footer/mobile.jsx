import React from 'react';
import styled from 'styled-components';
import BottomBar from '../mobile/BottomBar';

// Main Footer

const Wrapper = styled.div`
  width: 100%;
  height: 48px;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  background: ${props => props.theme.colors.shades.white};
`;

const Footer = React.memo(() => (
  <>
    <Wrapper className="standard-mobile-footer">
      <BottomBar />
    </Wrapper>
  </>
));

export default Footer;
