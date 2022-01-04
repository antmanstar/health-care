import React from 'react';
import styled from 'styled-components';
import defaultTheme from '../../style/themes';
import { Mobile } from '../layouts';
import MobileButton from '../presentation/shared/mobile/MobileButton';
import { Helmet } from 'react-helmet-async';

// MOBILE: Claim - Contact Customer Support
// TODO: Bring info from prior view (Claims Details), Wire Up Actions (Paul; routing work is needed here)

const {
  MobileContentWrapper,
  MobileSectionBackground,
  MobileContainer,
  MobileListTitle,
  TrimmedHeader
} = defaultTheme.components;

const ContentWrapper = styled(MobileContentWrapper)`
  z-index: 1;
`;

const ColoredTrimmedHeader = styled(TrimmedHeader)`
  margin-bottom: -40px;
  background: ${props => props.theme.colors.roles.success};
  z-index: 0;
`;

const Title = styled.h2`
  margin: 0 0 4px;
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.theme.colors.shades.blue};
`;

const ClaimNumberAndDate = styled.p`
  margin: 0 0 16px;
  font-size: 14px;
  font-weight: 400;
  color: ${props => props.theme.colors.shades.gray};

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

  &.paid {
    color: ${props => props.theme.colors.roles.success};
  }
  &.pending {
    color: ${props => props.theme.colors.roles.pending};
  }
`;

const Details = styled.p`
  margin: 0;
  color: ${props => props.theme.colors.shades.darkGray};
`;

const ContactSupportClaim = () => (
  <>
    <Helmet>
      <title>{reflection.layoutProps.navProps.title} - Evry Health</title>
    </Helmet>
    <ColoredTrimmedHeader />
    <ContentWrapper>
      <MobileSectionBackground>
        <MobileContainer>
          <Title>Office Evaluation (New Patient)</Title>
          <ClaimNumberAndDate>Claim # 123293bf0-91</ClaimNumberAndDate>
          <Status className="paid">Completed</Status>
          <Details>
            This request was completed on 4/18/2018. If you have questions, contact us below.
          </Details>
        </MobileContainer>
      </MobileSectionBackground>
      <MobileListTitle>Contact Customer Support</MobileListTitle>
      <MobileButton icon="message" text="Send a Message" />
      <MobileButton icon="access_time" text="Schedule a Phone Call" />
      <MobileButton icon="phone" text="Call Now" />
    </ContentWrapper>
  </>
);

const reflection = {
  component: ContactSupportClaim,
  layout: Mobile,
  layoutProps: {
    titleWrapperClass: 'none',
    navProps: {
      left: 'back',
      title: 'Contact Customer Support',
      permanentTitle: true,
      noBg: true
    }
  },
  route: '/contact-support-claim',
  forAuthorized: true
};

export default ContactSupportClaim;

export { reflection };
