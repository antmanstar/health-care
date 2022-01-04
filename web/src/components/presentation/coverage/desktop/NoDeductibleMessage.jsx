import React from 'react';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';

// No Deductible Message

const Wrapper = styled.div`
  text-align: center;
  width: 100%;
  color: ${props => props.theme.colors.shades.blue};

  p {
    display: block;
    margin: 0 0 4px 0;
    color: #252526;
    font-size: 14px;
  }

  h2 {
    margin: 0;
    font-size: 22px;
  }

  @media ${defaultTheme.device.tablet} {
    width: 33.33%;

    p {
      font-size: 16px;
      margin-bottom: 8px;
    }

    h2 {
      margin: 0;
      font-size: 24px;
    }
  }
`;

const NoDeductibleMessage = React.memo(() => (
  <Wrapper>
    <p>Your EPO has a</p>
    <h2>$0 Deductible</h2>
  </Wrapper>
));

export default NoDeductibleMessage;
