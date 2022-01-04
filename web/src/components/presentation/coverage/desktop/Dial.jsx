import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Radial Graph for Coverage Summary Section

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 16px;

  svg {
    transform: rotate(-90deg);
    background: #fafafa;
    border-radius: 50%;
    display: block;
  }

  @media ${props => props.theme.device.tabletXL} {
    margin: 0 16px 0 0;
  }
`;

const Circle = styled.circle`
  fill: #fafafa;
  stroke: ${props =>
    (props.color === 'orange' && props.theme.colors.shades.pinkOrange) ||
    (props.color === 'blue' && props.theme.colors.shades.blue) ||
    props.theme.colors.shades.gray};
  stroke-width: 30;
  stroke-dasharray: ${props => props.strokeDashArray};
  transition: stroke-dasharray 0.3s ease;

  @media ${props => props.theme.device.tablet} {
    stroke-width: 50;
  }
`;

const Cutout = styled.div`
  position: absolute;
  height: 56px;
  width: 56px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${props => props.theme.colors.shades.white};
  border-radius: 50%;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
`;

const Dial = ({ percentage, color }) => {
  const setPieChart = number => {
    const total = 200;
    const result = (number * total) / 100;
    const fixedNumber = `${result} ${total}`;
    return fixedNumber;
  };

  return (
    <Wrapper>
      <svg width="100" height="100">
        <Circle
          r="32"
          cx="50"
          cy="50"
          strokeDashArray={setPieChart(percentage || 0)}
          color={color}
        />
      </svg>
      <Cutout />
    </Wrapper>
  );
};

Dial.propTypes = {
  percentage: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired
};

export default Dial;
