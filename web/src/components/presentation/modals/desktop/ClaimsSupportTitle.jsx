import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Title & Claim # Combo for Claims Support Modals

const ClaimNumber = styled.h3`
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: 400;
  color: ${props => props.theme.colors.shades.blue};
`;

const ClaimsSupportTitle = React.memo(({ claimNumber, title }) => (
  <>
    <ClaimNumber>{` Claim #${claimNumber}`}</ClaimNumber>
    <Title>{title}</Title>
  </>
));

ClaimsSupportTitle.propTypes = {
  claimNumber: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
};

export default ClaimsSupportTitle;
