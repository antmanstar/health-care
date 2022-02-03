/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import SmallButton from '../../shared/desktop/SmallButton';
import BenefitBreakdown from './BenefitBreakdown';
import actions from '@evry-member-app/shared/store/actions';
import images from '../../../../utils/images';
import numberFormat from '../../../../utils/numberFormat';

const { setModalData, showModal } = actions;

// Individual Claims Entry for the "ClaimsList" in the "ClaimsHistorySection" on the "Claims" View

const { SectionDivider, SpaceBetween, SectionBackground } = defaultTheme.components;

const Wrapper = styled.div`
  box-sizing: border-box;
  margin-bottom: 8px;
  background: #fafafa;
  border-left: 2px solid ${props => props.theme.colors.roles.success};
`;

const EditedSectionDivider = styled(SectionDivider)`
  border-color: #e9e9e9;
`;

const ClaimSummary = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
`;

const InnerWrapper = styled.div`
  &:first-child {
    width: 180px;
    margin-right: 32px;
  }

  &.status-and-toggle {
    display: flex;
    margin-left: auto;

    width: auto;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
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
  &.claim-number {
    font-size: 8px;
  }
`;

const Status = styled.h4`
  margin: 0;
  font-size: 12px;
  text-transform: uppercase;
  color: ${props =>
    props.status === 'approved'
      ? props.theme.colors.roles.success
      : props.status === 'closed'
      ? props.theme.colors.roles.success
      : props.theme.colors.shades.darkGray};

  @media screen and (min-width: 1200px) {
    font-size: 16px;
    margin-right: 25px;
  }
`;

const Toggle = styled.div`
  display: flex;
  align-items: center;
  font-weight: 400;
  color: ${props => props.theme.colors.shades.blue};
  cursor: pointer;

  p {
    margin: 0 0 2px;
    font-size: 14px;
  }

  i {
    margin: 0 0 0 8px;
    color: ${props => props.theme.colors.shades.blue};
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

const ClaimDetails = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-bottom: 8px;

  & > * {
    flex: 1 auto;
    align-items: stretch;
  }
`;

const SmallSectionBackground = styled(SectionBackground)`
  width: auto;
  margin: 0 0 10px;
`;

const FlexGroup = styled.div`
  &.claim-costs {
    margin-right: 6px;
    flex-grow: 2;
  }
  &.claim-status {
    max-width: 310px;
    text-align: left;
    display: flex;
    flex-flow: column wrap;
    align-items: stretch;

    @media screen and (min-width: 1200px) {
      margin-left: 6px;
    }

    .claim-physician {
      align-self: stretch;
      flex: 1;
    }

    @media ${props => props.theme.device.tabletXL} {
      max-width: 100%;
    }
  }
`;

const SubmitFeedback = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (min-width: 1200px) {
    flex-direction: row;
  }
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

const ProviderName = styled.h3`
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 700;
  color: ${props => props.theme.colors.shades.black};
`;

const ProviderInfo = styled.p`
  margin: 0;
  line-height: 1.4em;
  color: ${props => props.theme.colors.shades.darkGray};
`;

const EobLink = styled.p`
  margin: 0;
  font-size: 10px;
  text-align: left;
  @media screen and (min-width: 1200px) {
    font-size: 16px;
  }
  a {
    margin: 0 2px 0 4px;
    color: ${props => props.theme.colors.shades.pinkOrange};
  }
`;

const MobileContainer = styled.div`
  &.content-mobile-text {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .status-and-toggle {
      width: 100%;
      display: flex;
      justify-content: center;
      margin: 18px 0 0 0;
    }
    @media screen and (min-width: 1200px) {
      display: none;
    }
  }
`;

const DesktopContainer = styled.div`
  display: none;
  @media screen and (min-width: 1200px) {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
`;

const ContentSubmitFeedback = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media screen and (min-width: 1200px) {
    justify-content: space-between;
    flex-direction: row;
  }

  .support-button {
    margin: 9px auto;
    @media screen and (min-width: 1200px) {
      margin-right: 0;
    }
  }
`;

class Claim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible || false
    };

    this.handlers = {
      toggleClick: this.handleToggleClick.bind(this),
      handleContactCustomerSupportClick: this.handleContactCustomerSupportClick.bind(this),
      handleFeedbackClick: this.handleFeedbackClick.bind(this)
    };
  }

  handleToggleClick = () => {
    this.setState(prevState => ({
      visible: !prevState.visible
    }));
  };

  handleContactCustomerSupportClick = data => {
    this.props.setModalData(data);
    this.props.showModal('CLAIMS_SUPPORT');
  };

  handleFeedbackClick = data => {
    this.props.setModalData(data);
    this.props.showModal('SUBMIT_CLAIM_FEEDBACK');
  };

  render() {
    const { visible } = this.state;
    const { dateOfService, claimNumber, status, provider, eobUrl, claimDetail } = this.props;

    return (
      <Wrapper>
        <ClaimSummary>
          <MobileContainer className="content-mobile-text">
            <div>
              <Text>{dateOfService}</Text>
              <SmallText className="claim-number">{`Claim # ${claimNumber}`}</SmallText>
            </div>
            <div>
              <Text>{provider.name}</Text>
              <SmallText>{provider.practice}</SmallText>
            </div>
            <Status status={status.toLowerCase()}>{status}</Status>
            <InnerWrapper className="status-and-toggle">
              <Toggle onClick={this.handlers.toggleClick}>
                <p>{visible ? 'Collapse' : 'Expand Details'}</p>
                {visible ? (
                  <i className="material-icons">keyboard_arrow_up</i>
                ) : (
                  <i className="material-icons">keyboard_arrow_down</i>
                )}
              </Toggle>
            </InnerWrapper>
          </MobileContainer>
          <DesktopContainer>
            <InnerWrapper>
              <Text>{dateOfService}</Text>
              <SmallText>{`Claim # ${claimNumber}`}</SmallText>
            </InnerWrapper>
            <InnerWrapper>
              <Text>{provider.name}</Text>
              <SmallText>{provider.practice}</SmallText>
            </InnerWrapper>
            <InnerWrapper className="status-and-toggle">
              <Status status={status.toLowerCase()}>{status}</Status>
              <Toggle onClick={this.handlers.toggleClick}>
                <p>{visible ? 'Collapse' : 'Expand Details'}</p>
                {visible ? (
                  <i className="material-icons">keyboard_arrow_down</i>
                ) : (
                  <i className="material-icons">keyboard_arrow_left</i>
                )}
              </Toggle>
            </InnerWrapper>
          </DesktopContainer>
        </ClaimSummary>
        {visible && (
          <>
            <EditedSectionDivider />
            <Padding16>
              <ClaimDetails>
                <FlexGroup className="claim-costs">
                  <SmallSectionBackground>
                    <BenefitBreakdown
                      totalBilled={numberFormat(claimDetail?.total_billed)}
                      discounts={numberFormat(claimDetail?.total_adjustment)}
                      payment={numberFormat(claimDetail?.total_payment_to_provider)}
                      owed={numberFormat(claimDetail?.total_member_responsibility)}
                    />
                  </SmallSectionBackground>
                </FlexGroup>
                <FlexGroup className="claim-status">
                  <SmallSectionBackground className="claim-physician">
                    <Padding16>
                      <ProviderName>{provider.name}</ProviderName>
                      <ProviderInfo>
                        {provider.practice}
                        <br />
                        {provider.address}
                        <br />
                        {provider.phoneNumber ||
                          (claimDetail &&
                            claimDetail?.provider_phones &&
                            claimDetail?.provider_phones[0]?.phone_number)}
                      </ProviderInfo>
                    </Padding16>
                  </SmallSectionBackground>
                </FlexGroup>
              </ClaimDetails>
              <EobLink>
                Need more info?
                <a href={eobUrl}>Download Explanation of Benefits</a>
                {`.`}
              </EobLink>
            </Padding16>
            <EditedSectionDivider />
            <Padding16>
              <ContentSubmitFeedback>
                <SubmitFeedback>
                  <Text>How do you feel about this claim?</Text>
                  <div>
                    <FeedbackButton
                      onClick={() =>
                        this.handlers.handleFeedbackClick({
                          feedbackChoice: 'positive',
                          claimNumber
                        })
                      }
                    >
                      <img src={images['feedback-positive']} alt="positive response" />
                    </FeedbackButton>
                    <FeedbackButton
                      onClick={() =>
                        this.handlers.handleFeedbackClick({
                          feedbackChoice: 'neutral',
                          claimNumber
                        })
                      }
                    >
                      <img src={images['feedback-neutral']} alt="neutral response" />
                    </FeedbackButton>
                    <FeedbackButton
                      onClick={() =>
                        this.handlers.handleFeedbackClick({
                          feedbackChoice: 'negative',
                          claimNumber
                        })
                      }
                    >
                      <img src={images['feedback-negative']} alt="negative response" />
                    </FeedbackButton>
                  </div>
                </SubmitFeedback>
                <SmallButton
                  className="support-button"
                  text="Contact Customer Support"
                  onClick={() =>
                    this.handlers.handleContactCustomerSupportClick({
                      claimNumber,
                      status,
                      provider: provider.name || provider.practice
                    })
                  }
                />
              </ContentSubmitFeedback>
            </Padding16>
          </>
        )}
      </Wrapper>
    );
  }
}

Claim.propTypes = {
  visible: PropTypes.bool,
  dateOfService: PropTypes.string.isRequired,
  claimNumber: PropTypes.string.isRequired,
  claimDetail: PropTypes.shape({}),
  status: PropTypes.string.isRequired,
  provider: PropTypes.shape({
    name: PropTypes.string.isRequired,
    practice: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string
  }).isRequired,
  eobUrl: PropTypes.string.isRequired,
  showModal: PropTypes.func.isRequired,
  setModalData: PropTypes.func.isRequired
};

Claim.defaultProps = {
  visible: false,
  claimDetail: {}
};

const mapDispatchToProps = dispatch => ({
  setModalData: data => {
    dispatch(setModalData(data));
  },
  showModal: modal => {
    dispatch(showModal(modal));
  }
});

export default connect(null, mapDispatchToProps)(Claim);
