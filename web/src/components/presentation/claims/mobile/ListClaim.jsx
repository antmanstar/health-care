import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';

// MOBILE - Claim Entry in Claims List
// TODO: What is displayed if no provider / practice data?
// QUESTION: Aaron, is this a question for us, or the Evry team?

const {
  MobileContainer,
  MobileSectionBackground,
  SectionDivider,
  SpaceBetween
} = defaultTheme.components;

const Wrapper = styled(MobileSectionBackground)`
  box-sizing: border-box;
  border-left: 3px solid ${props => props.theme.colors.roles.success};
`;

const DateSent = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${props => props.theme.colors.shades.blue};
`;

const Status = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;

  &.closed {
    color: ${props => props.theme.colors.roles.success};
  }
  &.denied {
    color: ${props => props.theme.colors.shades.darkGray};
  }
`;

const Practice = styled.h2`
  margin: 16px 0 0;
  font-size: 18px;
  font-weight: 400;
  color: ${props => props.theme.colors.shades.blue};
`;

const ProviderName = styled.h3`
  margin: 4px 0 8px;
  font-size: 13px;
  font-weight: 400;
  text-transform: uppercase;
  color: ${props => props.theme.colors.shades.gray};
`;

const ClaimNumber = styled.p`
  margin: 0;
  font-weight: 300;
  color: ${props => props.theme.colors.shades.blue};
`;

const Button = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  color: ${props => props.theme.colors.shades.blue};

  .left {
    display: flex;
    align-items: center;

    p {
      margin: 0;
    }

    i {
      margin-right: 16px;
    }
  }
`;

const ListClaim = React.memo(({ dateOfService, claimNumber, status, provider }) => (
  <Wrapper className={status}>
    <MobileContainer>
      <SpaceBetween>
        <DateSent>{dateOfService}</DateSent>
        <Status className={status.toLowerCase()}>{status}</Status>
      </SpaceBetween>
      <Practice>{provider.practice}</Practice>
      <ProviderName>{provider.name}</ProviderName>
      <ClaimNumber>{`Claim # ${claimNumber}`}</ClaimNumber>
    </MobileContainer>
    <SectionDivider />
    <Button>
      <div className="left">
        <i className="material-icons">description</i>
        <p>See Claims Details</p>
      </div>
      <i className="material-icons">keyboard_arrow_right</i>
    </Button>
  </Wrapper>
));

ListClaim.propTypes = {
  dateOfService: PropTypes.string.isRequired,
  claimNumber: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  provider: PropTypes.shape({
    name: PropTypes.string.isRequired,
    practice: PropTypes.string.isRequired
  }).isRequired
};

export default ListClaim;
