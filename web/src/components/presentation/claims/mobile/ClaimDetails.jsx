import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import BenefitBreakdown from '../desktop/BenefitBreakdown';

// MOBILE - Claim Details for the Claim Details View

const {
  MobileSectionBackground,
  SectionDivider,
  MobileContainer,
  SpaceBetween
} = defaultTheme.components;

const EditedSpaceBetween = styled(SpaceBetween)`
  margin-bottom: 16px;
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

  &.paid {
    color: ${props => props.theme.colors.roles.success};
  }
  &.denied {
    color: ${props => props.theme.colors.shades.darkGray};
  }
`;

const ProviderTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.theme.colors.shades.blue};
`;

const ClaimNumber = styled.p`
  margin: 8px 0 0;
  font-weight: 300;
  color: ${props => props.theme.colors.shades.gray};
`;

const ProviderInfo = styled.p`
  margin: 0;
  line-height: 1.4em;
  color: ${props => props.theme.colors.shades.darkGray};
`;

const SpanWrapper = styled(MobileContainer)`
  span {
    font-weight: 700;
    text-transform: uppercase;
    margin: 0 5px;
    color: ${props => props.theme.colors.shades.blue};
  }
`;

const ClaimDetails = React.memo(({ dateOfService, status, claimNumber, provider, claimDetail }) => (
  <>
    <MobileSectionBackground>
      <MobileContainer>
        <ProviderTitle>{provider.name}</ProviderTitle>
      </MobileContainer>
      <SectionDivider />
      <MobileContainer>
        <ProviderInfo>
          {provider.practice}
          <br />
          {provider.address}
          <br />
          {provider.phoneNumber}
        </ProviderInfo>
      </MobileContainer>
    </MobileSectionBackground>
    <MobileSectionBackground>
      <BenefitBreakdown 
        totalBilled={claimDetail.total_billed}
        discounts={claimDetail.total_adjustment}
        payment={claimDetail.total_payment_to_provider}
        owed={claimDetail.total_member_responsibility}
      />
    </MobileSectionBackground>
    <MobileSectionBackground>
      <SpanWrapper>
        {`This Claim was`}
        <span>{status}</span>
      </SpanWrapper>
    </MobileSectionBackground>
  </>
));

ClaimDetails.propTypes = {
  dateOfService: PropTypes.string.isRequired,
  claimNumber: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  provider: PropTypes.shape({
    name: PropTypes.string.isRequired,
    practice: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired
  }).isRequired
};

export default ClaimDetails;
