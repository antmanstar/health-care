import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Dial from './Dial';

// Progress Dials & Numbers for Deductibles and OOP Max

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 33.33%;
  text-align: center;

  @media ${props => props.theme.device.tabletXL} {
    flex-direction: row;
    text-align: left;
  }
`;

const Label = styled.h2`
  margin: 0 0 4px 0;
  font-weight: 500;
  font-size: 16px;
  color: ${props => props.theme.colors.shades.blue};
`;

const Sublabel = styled.h4`
  margin: 0 0 8px 0;
  font-weight: 400;
  font-size: 12px;
  text-transform: uppercase;
  color: ${props => props.theme.colors.shades.gray};
`;

const NumberProgress = styled.h3`
  margin: 0;
  font-weight: 700;
  font-size: 24px;
  color: ${props => props.theme.colors.shades.blue};

  span {
    font-weight: 400;
    font-size: 16px;
  }
`;

const DialAndNumbers = ({ label, sublabel, currentValue, maxValue, color }) => (
  <Container>
    <Dial percentage={(currentValue / maxValue) * 100} color={color} />
    <div>
      <Label>{label}</Label>
      <Sublabel>{sublabel}</Sublabel>
      <NumberProgress>
        {`$${currentValue}`}
        <span>{` / $${maxValue}`}</span>
      </NumberProgress>
    </div>
  </Container>
);

DialAndNumbers.propTypes = {
  label: PropTypes.string.isRequired,
  sublabel: PropTypes.string.isRequired,
  currentValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired
};

export default DialAndNumbers;
