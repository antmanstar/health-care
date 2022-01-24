import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import leadingZero from '../../../../utils/number';
import Loader from '../Loader/Loader';

// Tiles with Label / Number for "ClaimsTotals" Component

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 24%;
  padding: 32px 0;
  background: ${props => props.theme.colors.shades.white};
  text-align: center;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  @media screen and (min-width: 300px) and (max-width: 1200px) {
    width: 49%;
  }
`;

const Number = styled.h1`
  margin: 0 0 8px 0;
  font-size: 22px;
  font-weight: 900;
  color: ${props => props.theme.colors.shades.blue};

  @media ${props => props.theme.device.tabletXL} {
    font-size: 32px;
  }

  &.green {
    color: ${props => props.theme.colors.roles.success};
  }
`;

const Label = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 400;
  color: ${props => props.theme.colors.shades.blue};
`;

const NumberTile = React.memo(({ number, label, currency, green }) => (
  <Wrapper>
    {number == null ? (
      <Loader />
    ) : (
      <>
        <Number className={green && 'green'}>
          {currency ? `$${number}` : leadingZero(number)}
        </Number>
        <Label>{label}</Label>
      </>
    )}
  </Wrapper>
));

NumberTile.propTypes = {
  number: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  currency: PropTypes.bool,
  green: PropTypes.bool
};

NumberTile.defaultProps = {
  currency: false,
  green: false
};

export default NumberTile;
