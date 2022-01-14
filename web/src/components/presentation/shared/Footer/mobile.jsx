import React from 'react';
import styled from 'styled-components';
import BottomBar from '../mobile/BottomBar';

// Main Footer

const Wrapper = styled.div`
  width: 100%;
  height: 8px;
 
  background: ${props => props.theme.gradients.main};
`;

const Footer = React.memo(() => (
  <>
    <Wrapper className="standard-mobile-footer">
      {/* <BottomBar /> */}
    </Wrapper>
  </>
));

export default Footer;
