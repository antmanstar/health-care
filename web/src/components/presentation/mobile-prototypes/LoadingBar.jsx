import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// MOBILE - Loading Bar

const Wrapper = styled.div`
  margin: 16px auto;
  position: relative;
`;

const Background = styled.div`
  width: 100%;
  height: 4px;
  background: ${props => props.theme.colors.shades.nearlyWhite};
  opacity: 0.25;
`;

const Fill = styled.div`
  position: absolute;
  width: ${props => props.percentage};
  height: 6px;
  top: 50%;
  transform: translateY(-50%);
  background: ${props => props.theme.colors.shades.pinkOrange};
`;

const LoadingBar = React.memo(({ percentage }) => (
  <Wrapper>
    <Background />
    <Fill percentage={`${percentage}%`} />
  </Wrapper>
));

LoadingBar.propTypes = {
  percentage: PropTypes.number.isRequired
};

export default LoadingBar;
