import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';

// MOBILE - Support Request Entry in Support Requests List

const { MobileContainer, MobileSectionBackground, SpaceBetween } = defaultTheme.components;

const Wrapper = styled(MobileSectionBackground)`
  box-sizing: border-box;
  border-left: 3px solid ${props => props.theme.colors.roles.danger};
  border-radius: 0 4px 4px 0;

  &.completed {
    border-left: 3px solid ${props => props.theme.colors.roles.success};
  }
  &.pending {
    border-left: 3px solid ${props => props.theme.colors.roles.pending};
  }
`;

const DateSent = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  color: ${props => props.theme.colors.shades.blue};
`;

const Status = styled.p`
  margin: 0;
  font-size: 14px;
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

const Title = styled.h2`
  margin: 16px 0 4px;
  font-size: 18px;
  font-weight: 400;
  color: ${props => props.theme.colors.shades.blue};
`;

const RequestNumber = styled.p`
  margin: 0;
  font-size: 13px;
  font-weight: 400;
  text-transform: uppercase;
  color: ${props => props.theme.colors.shades.gray};
`;

const ListSupportRequest = React.memo(({ dateSent, title, requestNumber, status }) => (
  <Wrapper className={status}>
    <MobileContainer>
      <SpaceBetween>
        <DateSent>{dateSent}</DateSent>
        <Status className={status}>{status}</Status>
      </SpaceBetween>
      <Title>{title}</Title>
      <RequestNumber>{`Request # ${requestNumber}`}</RequestNumber>
    </MobileContainer>
  </Wrapper>
));

ListSupportRequest.propTypes = {
  dateSent: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  requestNumber: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['completed', 'pending', 'action required']).isRequired
};

export default ListSupportRequest;
