/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import Loader from '../../shared/Loader/Loader';
import SupportProfile from '../../shared/desktop/SupportProfile';
import SmallTitleAndButton from '../../shared/desktop/SmallTitleAndButton';
import TwoColumnInfoItem from '../../shared/desktop/TwoColumnInfoItem';
import HelpArticleLink from '../../shared/desktop/HelpArticleLink';
import images from '../../../../utils/images';
// My Support Section for the Customer Support View
// TODO: Need Concierge Care Article Link from Knowledgebase

const { SectionBackground, Container, SectionDivider, TwoColumnRow } = defaultTheme.components;

const SmallContainer = styled.div`
  width: 100%;

  @media ${defaultTheme.device.tablet} {
    width: 48%;
  }
`;

const H3 = styled.h3`
  color: ${props => props.theme.colors.shades.blue};
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 30px;
`;

const Description = styled.p`
  margin: 25px 0;
  font-weight: 300;
  font-size: 12px;
  line-height: 20px;
  color: ${props => props.theme.colors.shades.darkGray};
  @media ${defaultTheme.device.mobile} {
    font-size: 16px;
  }
`;

const SupportProfileWithMarginWrapper = styled.div`
  margin: 32px 0 0;
`;

const TwoColumRowWithBreak = styled(TwoColumnRow)`
  flex-direction: column;
  width: 100%;
  & > *:first-child {
    margin-bottom: 32px;
  }
  @media ${defaultTheme.device.tablet} {
    flex-direction: row;
    & > *:first-child {
      margin-bottom: 0;
    }
  }
`;
const InfoItemRight = styled.span`
  text-align: right;
  font-size: 12px;
  @media ${defaultTheme.device.mobile} {
    font-size: 16px;
  }
`;
const InfoItemLeft = styled.span`
  text-align: left;
  font-size: 12px;
  @media ${defaultTheme.device.mobile} {
    font-size: 16px;
  }
`;

const ButtonLink = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background: ${props => props.theme.colors.shades.nearlyWhite};
  color: ${props => props.theme.colors.shades.darkGray};
  text-decoration: none;
  border-radius: 4px;
  border: none;
  width: 100%;

  &:hover {
    background: #ececec;
    cursor: pointer;
  }

  & div.left-group {
    display: flex;
    align-items: center;

    i {
      margin-right: 16px;
    }
  }
`;
class MySupportSection extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handlers = {
      handleContactCareGuideClick: this.handleContactCareGuideClick.bind(this),
      handleConciergeCareClick: this.handleConciergeCareClick.bind(this)
    };
  }

  handleContactCareGuideClick = () => {
    this.props.showModal('CONTACT_CARE_GUIDE');
  };

  handleConciergeCareClick = () => {
    this.props.showModal('CONCIERGE_CARE');
  };

  render() {
    const { careGuide, evryContactInfo } = this.props;
    return (
      <SectionBackground>
        <Container>
          <TwoColumRowWithBreak>
            <SmallContainer>
              {!careGuide ? (
                <Loader />
              ) : (
                <>
                  <SmallTitleAndButton
                    text="Your Care Guide"
                    buttonText={`Contact ${careGuide.first_name}`}
                    onClick={this.handlers.handleContactCareGuideClick}
                  />
                  <SupportProfileWithMarginWrapper>
                    {careGuide.error && careGuide.error.length > 0 ? (
                      <SupportProfile />
                    ) : (
                      <SupportProfile
                        name={`${careGuide.first_name} ${careGuide.last_name}`}
                        roleLabel="Care Guide"
                        number={`${careGuide.phone.phone_number} ${
                          careGuide.phone.phone_number_extension &&
                          careGuide.phone.phone_number_extension.trim().length > 0
                            ? `(Ext - ${careGuide.phone.phone_number_extension})`
                            : ''
                        }`}
                        email={careGuide.email.email_address}
                        imgSrc={
                          careGuide.my_image_file_id && careGuide.my_image_file_id.length > 0
                            ? `` //URL NEEDED
                            : null
                        }
                      />
                    )}
                  </SupportProfileWithMarginWrapper>
                  <Description>
                    Your personal care guide is here to take care of all your health insurance
                    needs. Whether you have questions about your care plan, need to schedule an
                    appointment, or just want to follow up on a claim, we are here to help.
                  </Description>
                  {/* <HelpArticleLink
                    text="Learn more about Concierge Care"
                    url="https://www.evryhealth.com/meet-your-care-team"
                  /> */}
                  <ButtonLink onClick={this.handlers.handleConciergeCareClick}>
                    <div className="left-group">
                      <i className="material-icons">info_outline</i>
                      <p>Learn more about Concierge Care</p>
                    </div>
                    <i className="material-icons info-arrow">keyboard_arrow_right</i>
                  </ButtonLink>
                </>
              )}
            </SmallContainer>
            <SmallContainer>
              {!evryContactInfo ? (
                <Loader />
              ) : (
                <>
                  <H3>Evry Health, Inc</H3>
                  <TwoColumnInfoItem>
                    <InfoItemLeft>Customer Support Phone</InfoItemLeft>
                    <InfoItemRight>
                      <a
                        className="no-link-style"
                        href={`tel:+1${evryContactInfo.phones[0].phone_number.split('-').join('')}`}
                      >
                        {`1-${evryContactInfo.phones[0].phone_number}`}
                      </a>
                    </InfoItemRight>
                  </TwoColumnInfoItem>
                  <TwoColumnInfoItem>
                    <InfoItemLeft>Customer Support Email</InfoItemLeft>
                    <InfoItemRight>
                      <a href={`mailto:${evryContactInfo.support_email.email_address}`}>
                        {evryContactInfo.support_email.email_address}
                      </a>
                    </InfoItemRight>
                  </TwoColumnInfoItem>
                  <TwoColumnInfoItem>
                    <InfoItemLeft>Fax Number</InfoItemLeft>
                    <InfoItemRight>
                      <a
                        className="no-link-style"
                        href={`tel:+1${evryContactInfo.phones[2].phone_number.split('-').join('')}`}
                      >
                        {`1-${evryContactInfo.phones[2].phone_number}`}
                      </a>
                    </InfoItemRight>
                  </TwoColumnInfoItem>
                  <TwoColumnInfoItem>
                    <InfoItemLeft>Official Website</InfoItemLeft>
                    <InfoItemRight>
                      <a href={`https://${evryContactInfo.website}`}>{evryContactInfo.website}</a>
                    </InfoItemRight>
                  </TwoColumnInfoItem>
                  <TwoColumnInfoItem>
                    <InfoItemLeft>Mailing Address</InfoItemLeft>
                    <InfoItemRight>
                      {evryContactInfo.mailing_address.address1}
                      <br />
                      {`${evryContactInfo.mailing_address.city}, ${evryContactInfo.mailing_address.state} ${evryContactInfo.mailing_address.zip}`}
                    </InfoItemRight>
                  </TwoColumnInfoItem>
                </>
              )}
            </SmallContainer>
          </TwoColumRowWithBreak>
        </Container>
        <SectionDivider />
      </SectionBackground>
    );
  }
}

MySupportSection.propTypes = {
  showModal: PropTypes.func.isRequired,
  careGuide: PropTypes.shape({}).isRequired,
  evryContactInfo: PropTypes.shape({}).isRequired
};

export default MySupportSection;
