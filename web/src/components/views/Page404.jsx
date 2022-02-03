import React from 'react';
import { Standard } from '../layouts';
import styled from 'styled-components';
import defaultTheme from '../../style/themes';
import SmallButton from '../presentation/shared/desktop/SmallButton';
import logoImg from '@evry-member-app/assets/images/vector/logo.svg';
import { Helmet } from 'react-helmet-async';

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0;
  align-items: center;
`;

const InnerContentHeader = styled.div`
  height: 455px;
  background: ${defaultTheme.gradients.main};
  width: 100%;
  display: flex;
  justify-content: center;
  @media (max-width: 847px) {
    height: 355px;
  }
  @media ${defaultTheme.device_up.tablet} {
    justify-content: center;
    height: 300px;
  }
  @media ${defaultTheme.device_up.mobile} {
    height: 250px;
  }
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: 847px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  background: ${defaultTheme.gradients.main};
  @media (max-width: 847px) {
    max-width: 700px;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  width: 100%;
  @media ${defaultTheme.device_up.tablet} {
    justify-content: center;
  }
`;

const Title = styled.div`
  display: flex;
  width: 100%;
  font-size: 200px;
  font-weight: 900;
  color: ${defaultTheme.colors.shades.white};
  line-height: 200px;
  margin-bottom: 24px;

  @media (max-width: 847px) {
    font-size: 160px;
    line-height: 140px;
  }

  @media ${defaultTheme.device_up.tablet} {
    font-size: 100px;
    line-height: 120px;
    justify-content: center;
  }

  @media ${defaultTheme.device_up.mobile} {
    font-size: 50px;
    line-height: 60px;
  }
`;

const InnerContentBody = styled.div`
  display: flex;
  width: 100%;
  max-width: 847px;
  flex-direction: column;
  justify-contnet: center;
  margin-top: 45px;
  margin-left: 20px;
  @media ${defaultTheme.device_up.tablet} {
    margin-left: 0px;
  }
`;

const Content = styled.div`
  font-size: 35px;
  font-weight: 300;
  color: ${defaultTheme.colors.shades.darkGray};
  @media (max-width: 847px) {
    font-size: 24px;
  }
  @media ${defaultTheme.device_up.tablet} {
    text-align: center;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  margin-top: 32px;
  width: 100%;
  align-items: center;
  font-size: 25px;
  font-weight: 400;
  color: ${defaultTheme.colors.shades.blue};

  @media ${defaultTheme.device_up.tablet} {
    flex-direction: column;
    justfiy-content: center;
  }

  @media ${defaultTheme.device_up.mobile} {
    font-size: 20px;
  }
`;

const PhoneInfo = styled.div`
  align-items: center;
  display: flex;

  @media ${defaultTheme.device_up.tablet} {
    min-width: 210px;
  }
`;

const VerticalDivider = styled.div`
  width: 1px;
  background: #dadada;
  height: 28px;
  margin: auto 20px;

  @media ${defaultTheme.device_up.tablet} {
    display: none;
  }
`;

const MailInfo = styled.div`
  align-items: center;
  display: flex;

  @media ${defaultTheme.device_up.tablet} {
    min-width: 210px;
  }
`;

const StyeldIcon = styled.i`
  font-size: 28px;
  color: ${defaultTheme.colors.shades.blue};
  margin-right: 5px;
`;

const HorizontalDivider = styled.div`
  height: 1px;
  background: #bbbcbc;
  width: 100%;
  margin: 64px auto 40px auto;
`;

const StyledButton = styled(SmallButton)`
  width: 154px;
  height: 48px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  justify-content: center;
  filter: drop-shadow(0px 20px 30px rgba(0, 0, 0, 0.15));
  align-self: center;
`;

const Page404 = () => (
  <>
    <Helmet>
      <title>{reflection.layoutProps.title} - Evry Health</title>
    </Helmet>
    <StyledWrapper>
      <InnerContentHeader>
        <HeaderWrapper>
          <LogoWrapper>
            <img src={logoImg} alt="Evry Healthcare" style={{ width: '180px', height: '46px' }} />
          </LogoWrapper>
          <Title>404 Error</Title>
        </HeaderWrapper>
      </InnerContentHeader>
      <InnerContentBody>
        <Content>
          We can’t seem to find that page. Go back, or if you think there’s a problem, please
          contact us.
        </Content>
        <ContactInfo>
          <PhoneInfo>
            <StyeldIcon className="material-icons">phone</StyeldIcon>
            1-800-555-1234
          </PhoneInfo>
          <VerticalDivider />
          <MailInfo>
            <StyeldIcon className="material-icons">mail_outline</StyeldIcon>
            support@evryhealth.com
          </MailInfo>
        </ContactInfo>
        <HorizontalDivider />
        <StyledButton text="back" onClick={() => window.history.back()} />
      </InnerContentBody>
    </StyledWrapper>
  </>
);

const reflection = {
  component: Page404,
  layoutProps: {
    title: '404 Page found'
  }
};

export default Page404;

export { reflection };