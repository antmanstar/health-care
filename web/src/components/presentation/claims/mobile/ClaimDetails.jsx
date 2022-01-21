import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import BenefitBreakdown from '../desktop/BenefitBreakdown';
import SmallButton from '../../shared/desktop/SmallButton';
import actions from '@evry-member-app/shared/store/actions';
import images from '../../../../utils/images';

// MOBILE - Claim Details for the Claim Details View

const { setModalData, showModal } = actions;

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

const Text = styled.h4`
  margin: 0 0 4px;
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.theme.colors.shades.blue};
  @media ${props => props.theme.device.desktop} {
    font-size: 18px;
  }
`;

const SmallText = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 400;
`;

const SpanWrapper = styled(MobileContainer)`
  span {
    font-weight: 700;
    text-transform: uppercase;
    margin: 0 5px;
    color: ${props => props.theme.colors.shades.blue};
  }
`;

const EobLink = styled.p`
  margin: 10px 0;
  text-align: center;

  a {
    margin: 0 2px 0 4px;
    color: ${props => props.theme.colors.shades.pinkOrange};
  }
`;

const FlexGroup = styled.div`
  &.claim-costs {
    margin-right: 6px;
    flex-grow: 2;
  }
  &.claim-status {
    max-width: 310px;
    text-align: left;
    margin-left: 6px;
    display: flex;
    flex-flow: column wrap;
    align-items: stretch;

    .claim-physician {
      align-self: stretch;
      flex: 1;
    }

    @media ${props => props.theme.device.tabletXL} {
      max-width: 100%;
    }
  }
`;

const Padding16 = styled.div`
  padding: 16px;

  span {
    font-weight: 700;
    text-transform: uppercase;
    margin: 0 5px;
    color: ${props => props.theme.colors.shades.blue};
  }
`;

const SubmitFeedback = styled.div`
  display: flex;
  align-items: center;

  h4 {
    font-weight: 300;
    margin-right: 16px;
  }
`;

const FeedbackButton = styled.button`
  padding-bottom: 0;
  border: none;
  outline: none;
  margin-right: 4px;
  background: transparent;
  cursor: pointer;
  transition: all 150ms ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`;

const ClaimDetails = ({ 
  dateOfService, 
  status, 
  claimNumber, 
  provider, 
  claimDetail, 
  eobUrl,
  setModalData,
  showModal
}) => {
  const [ visible, setVisible ] = useState(false)

  const handleFeedbackClick = data => {
    setModalData(data);
    showModal('SUBMIT_CLAIM_FEEDBACK');
  }
  
  return (
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
      <EobLink>
        Need more info?
        <a href={eobUrl}>Download Explanation of Benefits</a>
        {`.`}
      </EobLink>
      <Padding16>
        <SpaceBetween>
          <SubmitFeedback>
            <Text>How do you feel about this claim?</Text>
            <FeedbackButton
              onClick={() =>
                handleFeedbackClick({
                  feedbackChoice: 'positive',
                  claimNumber
                })
              }
            >
              <img src={images['feedback-positive']} alt="positive response" />
            </FeedbackButton>
            <FeedbackButton
              onClick={() =>
                handleFeedbackClick({
                  feedbackChoice: 'neutral',
                  claimNumber
                })
              }
            >
              <img src={images['feedback-neutral']} alt="neutral response" />
            </FeedbackButton>
            <FeedbackButton
              onClick={() =>
                handleFeedbackClick({
                  feedbackChoice: 'negative',
                  claimNumber
                })
              }
            >
              <img src={images['feedback-negative']} alt="negative response" />
            </FeedbackButton>
          </SubmitFeedback>
        </SpaceBetween>
      </Padding16>
    </>
  )
};

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


const mapDispatchToProps = dispatch => ({
  setModalData: data => {
    dispatch(setModalData(data));
  },
  showModal: modal => {
    dispatch(showModal(modal));
  }
});

export default  connect(null, mapDispatchToProps)(React.memo(ClaimDetails));
