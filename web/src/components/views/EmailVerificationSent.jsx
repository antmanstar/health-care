import React, { useState } from 'react';
import styled from 'styled-components';
import defaultTheme from '../../style/themes';
import { Sparse } from '../layouts';
import { Helmet } from 'react-helmet-async';

import { connect } from 'react-redux';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import MessageAlert from "./MessageAlert";

const { LayoutWrapper, MobileContentWrapper } = defaultTheme.components;

const Container = styled.div`
  justify-content: center;
`;

const ActionButton = styled.button`
  box-sizing: border-box;
  padding: 18px;
  font-size: 20px;
  font-weight: 500;    
  width: 100%;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;
  background:#022B40;
  color: ${props => props.theme.colors.shades.white};
  outline: none;
  border: none;
  border-radius: 4px;
  box-shadow: 0px 20px 30px rgb(0 0 0 / 15%);
  margin: 25px 0 25px 0;
  max-width: 250px;

  @media ${props => props.theme.device.tabletXL} {
    margin: 25px 0 25px 0;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const Header = styled.div`
  color: #00263A;
  font-weight: 500;
  font-size: 28px;
`;

const Separator = styled.div`
  border-bottom: 1px solid #ddd;
  width: 100%;
  margin: 25px 0;
`;

const Body = styled.div`
  font-size: 16px;
  padding: 0 0 0 0;
  width: 100%;

  @media ${props => props.theme.device.tabletXL} {
    width: 60%;
    padding: 10px 0 10px 0;
  }
`;

const VerificationContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  padding-top: 48px;
`;

const EmailVerificationSent = props => {
  const [ buttonClicked, setButtonClicked ] = useState(false);

  function handleResend(e) {
    e.preventDefault();

    setButtonClicked(true);

    props.handleSubmit(props.token);
  }

  return (
    <LayoutWrapper>
      <Helmet>
        <title>{reflection.layoutProps.title} - Evry Health</title>
      </Helmet>
      <ContentWrapper>
        <Container>
          <VerificationContainer>
            <Header>Email Verification</Header>
            <Separator />
            <Body>
              Check your email for a link to verify your account.
              If you haven't got it, you can use the button below to send it again.
            </Body>
            <Separator />
            <Center>
              <ActionButton onClick={handleResend}>Send Link</ActionButton>
              {buttonClicked && <MessageAlert>Your email verification has been submitted. Please check your email inbox.</MessageAlert>}
            </Center>
          </VerificationContainer>
        </Container>
      </ContentWrapper>
    </LayoutWrapper>
  );
};

const mapStateToProps = state => ({
  token: selectors.getToken(state)
});

const mapDispatchToProps = dispatch => ({
  handleSubmit: (token) => {
    dispatch(actions.verifyEmail(token));
  }
});

const ConnectedEmailVerificationSent = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailVerificationSent);

const reflection = {
  component: ConnectedEmailVerificationSent,
  layout: Sparse,
  layoutProps: {
    title: 'Evry Member Portal',
    subtitle: "Verify your email."
  },
  route: '/email-verification-sent'
};

export default EmailVerificationSent;

export { reflection };
