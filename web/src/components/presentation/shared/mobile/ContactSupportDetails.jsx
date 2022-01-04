import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';

// MOBILE - Support Request Details for Contact Customer Support Views

const { MobileContainer, MobileSectionBackground } = defaultTheme.components;

const Title = styled.h2`
  margin: 0 0 4px;
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.theme.colors.shades.blue};
`;

const RequestNumberAndDate = styled.p`
  margin: 0 0 16px;
  font-size: 14px;
  font-weight: 300;
  color: ${props => props.theme.colors.shades.darkGray};

  span {
    font-style: italic;
    font-weight: 300;
  }
`;

const Status = styled.p`
  margin: 0 0 4px;
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
  color: ${props => props.theme.colors.roles.danger};

  &.completed {
    color: ${props => props.theme.colors.roles.success};
  }
  &.pending {
    color: ${props => props.theme.colors.roles.pending};
  }
`;

const Details = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${props => props.theme.colors.shades.darkGray};
`;

const ContactSupportDetails = React.memo(({ dateSent, title, number, status, details }) => (
  <MobileSectionBackground>
    <MobileContainer>
      <Title>{title}</Title>
      <RequestNumberAndDate>{`Request # ${number} - ${dateSent}`}</RequestNumberAndDate>
      <Status className={status}>{status}</Status>
      <Details>{details}</Details>
    </MobileContainer>
  </MobileSectionBackground>
));

ContactSupportDetails.propTypes = {
  dateSent: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  status: PropTypes.oneOf(['completed', 'pending', 'action required']).isRequired,
  details: PropTypes.string.isRequired
};

export default ContactSupportDetails;
