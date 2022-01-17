import React, { useState } from 'react';
import styled from 'styled-components';
import { Mobile } from '../layouts';
import defaultTheme from '../../style/themes';
import { Helmet } from 'react-helmet-async';
import logoImg from '@evry-member-app/assets/images/vector/logo-big-grey-text.svg';

const { MobileContentWrapper } = defaultTheme.components;

const EditedMobileContentWrapper = styled(MobileContentWrapper)`
  padding-top: 48px;
`;

const Container = styled.div`
  padding: 48px 16px 37px;
  background-color: #F4F4F4;
`;

const Header = styled.div`
  max-width: 568px;
  margin: 0 auto;
  text-align: center;
`;

const Footer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  text-align: left;
`;

const VerificationContainer = styled.div`
  margin-bottom: 27px;
  text-align: center;
`;

const VerificationBody = styled.div`
  margin-bottom: 43px;
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.15);
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  padding: 44px 48px 47px;
  background-color: #ffffff;
  margin-top: 20px;
`;

const BodyTitle = styled.p`
  font-size: 24px;
  font-weight: bold;
  line-height: 20px;
  color: #02324C;
`;

const BodyLabel = styled.p`
  font-size: 24px;
  color: #4A4A4B;
  max-width: 80%;
  margin: 30px auto;
  line-height: 30px;
`;

const BodyLink = styled.p`
  color:  #4A4A4B;
  text-align: center;
`;

const BodyFooter = styled.p`
  line-height: 20px;
  color:#4A4A4B;
  text-align: left;
`;

const Link = styled.a`
  color: #02324C;
  overflow-wrap: anywhere;
`;

const FooterItem = styled.p`
  line-height: 20px;
  margin-top: 0;
  margin-bottom: 16px;
  color: ${props => props.color};
`;

const VerifyButton = styled.button`
  box-sizing: border-box;
  padding: 24px;
  font-size: 22px;
  font-weight: 500;    
  width: 100%;
  max-width: 300px;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;
  background: ${props => props.theme.gradients.main};
  color: ${props => props.theme.colors.shades.white};
  outline: none;
  border: none;
  border-radius: 4px;
  box-shadow: 0px 20px 30px rgb(0 0 0 / 15%);
  margin: 20px 0 50px 0;

  &:hover {
    background: #1C4C66;
  }
`;

const Logo = styled.img`
  height: 85px;
`;

const VerifyEmail = () => {

  const [ verifyLink, setVerifyLink ] = useState("https://localhost:44374/api/Member/PasswordReset?email=jong.shin@evryhealth.com&amp;token=1fc3b23e-c54c-44b4-9141-5404d3537fe9");
  const [ safeURL, setSafeURL ] = useState("https://www.google.com/url?hl=en&amp;q=https://localhost:44374/api/Member/PasswordReset?email%3Djong.shin@evryhealth.com%26token%3D1fc3b23e-c54c-44b4-9141-5404d3537fe9&amp;source=gmail&amp;ust=1642020840296000&amp;usg=AOvVaw2lA9PpVjgJ4wvvGQRAm4nZ");

  return (
    <>
      <Helmet>
        <title>{reflection.layoutProps.navProps.title} - Evry Health</title>
      </Helmet>
      <EditedMobileContentWrapper>
        <Container>
          <Header>
            <VerificationContainer>
              <a href="https://www.evryhealth.com" target="_blank" data-saferedirecturl="https://www.evryhealth.com">
                <Logo src={logoImg} />
              </a>
              <VerificationBody>
                <BodyTitle>
                  Email Verification 
                </BodyTitle>
                <BodyLabel>
                  Use the button below to verify your email with your account 
                </BodyLabel>
                <BodyLink>
                  <Link href={verifyLink} target="_blank" data-saferedirecturl={safeURL}>
                    <VerifyButton>Verify</VerifyButton>
                  </Link>
                </BodyLink>
                <BodyFooter>
                  <span>
                    If you cannot click the link above, 
                    please copy and paste the full address into your browser:
                  </span>
                  <div>
                    <Link href={verifyLink} target="_blank" data-saferedirecturl={safeURL}>
                      {verifyLink}
                    </Link>
                  </div>
                </BodyFooter>
              </VerificationBody>
            </VerificationContainer>
          </Header>
          <Footer textAlign="left">
            <FooterItem color="#02324C">
              If you have not recently requested this, please contact Evry Health customer service at 800-883-2136 immediately.
            </FooterItem>
            <FooterItem color="#ff0000">
              This is an automatically generated email. Please do not reply to this email. 
            </FooterItem>
          </Footer>
        </Container>
      </EditedMobileContentWrapper>
    </>
  );
}


const reflection = {
  component: VerifyEmail,
  layout: Mobile,
  layoutProps: {
    titleWrapperClass: 'none',
    navProps: {
      left: 'back',
      title: 'Verify Email',
      permanentTitle: true,
      permanentBg: true
    }
  },
  route: '/verify-email'
};

export default VerifyEmail;

export { reflection };
