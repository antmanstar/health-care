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

// My Support Section for the Customer Support View
// TODO: Need Concierge Care Article Link from Knowledgebase

const { SectionBackground, Container, SectionDivider, TwoColumnRow } = defaultTheme.components;

const SmallContainer = styled.div`
  width: 100%;

  @media (min-width: 920px) {
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
  font-size: 16px;
  line-height: 20px;
  color: ${props => props.theme.colors.shades.darkGray};
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
  @media ${defaultTheme.device.tabletXL} {
    flex-direction: row;
    & > *:first-child {
      margin-bottom: 0;
    }
  }
`;

class MySupportSection extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handlers = {
      handleContactCareGuideClick: this.handleContactCareGuideClick.bind(this)
    };
  }

  handleContactCareGuideClick = () => {
    this.props.showModal('CONTACT_CARE_GUIDE');
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
                    <SupportProfile
                      name={`${careGuide.first_name} ${careGuide.last_name}`}
                      roleLabel="Care Guide"
                      number={`${careGuide.phone.phone_number} (Ext - ${
                        careGuide.phone.phone_number_extension
                      })`}
                      email={careGuide.email.email_address}
                      imgSrc="https://randomuser.me/api/portraits/women/58.jpg"
                    />
                  </SupportProfileWithMarginWrapper>
                  <Description>
                    Your personal care guide is here to take care of all your health insurance
                    needs. Whether you have questions about your care plan, need to schedule an
                    appointment, or just want to follow up on a claim, we are here to help.
                  </Description>
                  <HelpArticleLink
                    text="Learn more about Concierce Care"
                    url="http://www.google.com"
                  />
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
                    <span>Customer Support Phone</span>
                    <span>
                      <a
                        className="no-link-style"
                        href={`tel:+1${evryContactInfo.phones[0].phone_number.split('-').join('')}`}
                      >
                        {`1-${evryContactInfo.phones[0].phone_number}`}
                      </a>
                    </span>
                  </TwoColumnInfoItem>
                  <TwoColumnInfoItem>
                    <span>Customer Support Email</span>
                    <span>
                      <a href={`mailto:${evryContactInfo.support_email.email_address}`}>
                        {evryContactInfo.support_email.email_address}
                      </a>
                    </span>
                  </TwoColumnInfoItem>
                  <TwoColumnInfoItem>
                    <span>Fax Number</span>
                    <span>
                      <a
                        className="no-link-style"
                        href={`tel:+1${evryContactInfo.phones[2].phone_number.split('-').join('')}`}
                      >
                        {`1-${evryContactInfo.phones[2].phone_number}`}
                      </a>
                    </span>
                  </TwoColumnInfoItem>
                  <TwoColumnInfoItem>
                    <span>Official Website</span>
                    <span>
                      <a href={`https://${evryContactInfo.website}`}>{evryContactInfo.website}</a>
                    </span>
                  </TwoColumnInfoItem>
                  <TwoColumnInfoItem>
                    <span>Mailing Address</span>
                    <span>
                      {evryContactInfo.mailing_address.address1}
                      <br />
                      {`${evryContactInfo.mailing_address.city}, ${
                        evryContactInfo.mailing_address.state
                      } ${evryContactInfo.mailing_address.zip}`}
                    </span>
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
