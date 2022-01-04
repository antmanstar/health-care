import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Title & Request # Combo for Support Request Modals

const RequestNumber = styled.h3`
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

const SupportRequestTitle = React.memo(({ requestNumber, title }) => (
  <>
    <RequestNumber>{` Request #${requestNumber}`}</RequestNumber>
    <Title>{title}</Title>
  </>
));

SupportRequestTitle.propTypes = {
  requestNumber: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default SupportRequestTitle;
