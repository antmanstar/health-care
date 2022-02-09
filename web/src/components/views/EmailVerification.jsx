import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import defaultTheme from '../../style/themes';
import { Helmet } from 'react-helmet-async';
import CheckCircle from '@evry-member-app/assets/images/vector/check-in-circle.svg';
import Danger from '@evry-member-app/assets/images/vector/danger.svg';
import { Link as RouterLink } from 'react-router-dom';
import queryString from 'query-string';
import { Sparse } from '../layouts';
import LoadingSpinnerScreen from '../presentation/shared/Loader/LoadingSpinnerScreen';
import MessageAlert from './MessageAlert';

import { connect } from 'react-redux';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';

const { getEmailVerificationChallengeStatus } = selectors;

const { MobileContentWrapper } = defaultTheme.components;

const EditedMobileContentWrapper = styled(MobileContentWrapper)`
  padding-top: 48px;
`;

const Container = styled.div`
  display: grid;
  justify-content: center;
  grid-template-areas: 'check text .';
  grid-template-columns: 1fr auto 1fr;
  column-gap: 50px;

  @media (max-width: 1000px) {
    grid-template-areas: 'check' 'text';
    grid-template-columns: 1fr;
  }
`;

const FeedbackIcon = styled.img`
  width: 150px;
  height: 150px;
  margin-top: 25px;
  grid-area: check;
  justify-self: end;

  @media (max-width: 1000px) {
    justify-self: center;
    margin-bottom: 50px;
  }
`;

const ActionButton = styled.button`
  box-sizing: border-box;
  padding: 22px;
  font-size: 20px;
  font-weight: 500;
  width: 100%;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;
  background: ${props => props.bgColor};
  color: ${props => props.theme.colors.shades.white};
  outline: none;
  border: none;
  border-radius: 4px;
  box-shadow: 0px 20px 30px rgb(0 0 0 / 15%);
  margin: 25px 0 25px 0;
  max-width: 300px;

  @media ${props => props.theme.device.tabletXL} {
    margin: 25px 0 25px 0;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const Header = styled.div`
  color: #00263a;
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
  padding: 0;

  @media ${props => props.theme.device.tabletXL} {
    padding: 10px 0 10px 0;
  }
`;

const VerificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-area: text;
  place-self: center;
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const EmailVerification = props => {
  const [resendClicked, setResendClicked] = useState(false);

  function handleResend(e) {
    e.preventDefault();

    setResendClicked(true);

    props.handleResendSubmit(props.token);
  }

  function submitEmailChallenge() {
    const queryParams = queryString.parse(location.search);

    const verifyEmail = queryParams.email;
    const verifyToken = queryParams.token;

    if (verifyEmail && verifyToken) {
      props.handleChallenge(verifyEmail, verifyToken);
    }
  }

  useEffect(submitEmailChallenge, []);

  function renderLoading() {
    return (
      <Container>
        <VerificationContainer>
          <Header>Confirming your email....</Header>
          <Separator />
          <LoadingSpinnerScreen />
        </VerificationContainer>
      </Container>
    );
  }

  function renderVerificationFailureLoggedIn() {
    return (
      <>
        <Body>Click here to resend a new verification link.</Body>
        <Separator />
        <Center>
          <RouterLink to="/">
            <ActionButton bgColor="#022B40" onClick={handleResend}>
              Send Link Again
            </ActionButton>
          </RouterLink>
          {resendClicked && (
            <MessageAlert>
              Your email verification has been submitted. Please check your email inbox.
            </MessageAlert>
          )}
        </Center>
      </>
    );
  }

  function renderVerificationFailureLoggedOut() {
    return (
      <>
        <Body>Click here to login and get a new verification link.</Body>
        <Separator />
        <Center>
          <RouterLink to="/sign-in">
            <ActionButton bgColor="#022B40">Sign In</ActionButton>
          </RouterLink>
        </Center>
      </>
    );
  }

  function renderVerificationFailure() {
    const isLoggedIn = props?.token?.length > 0;

    return (
      <Container>
        <FeedbackIcon src={Danger} />
        <VerificationContainer>
          <Header>Your email verification link has expired</Header>
          <Separator />
          {isLoggedIn ? renderVerificationFailureLoggedIn() : renderVerificationFailureLoggedOut()}
        </VerificationContainer>
      </Container>
    );
  }

  function renderVerificationSuccess() {
    return (
      <Container>
        <FeedbackIcon src={CheckCircle} />
        <VerificationContainer>
          <Header>Verified!</Header>
          <Separator />
          <Body>Thanks for verifying your email! Click the button below to continue.</Body>
          <Separator />
          <Center>
            <RouterLink to="/">
              <ActionButton bgColor="#8ED081">Continue</ActionButton>
            </RouterLink>
          </Center>
        </VerificationContainer>
      </Container>
    );
  }

  function renderProperItem() {
    switch (props.emailVerificationChallengeStatus) {
      case null:
      case '':
      case undefined:
        return renderLoading();
      case 'failure':
        return renderVerificationFailure();
      case 'success':
        return renderVerificationSuccess();
      default:
        return renderLoading();
    }
  }

  return (
    <>
      <Helmet>
        <title>{reflection.layoutProps.title} - Evry Health</title>
      </Helmet>
      <EditedMobileContentWrapper>{renderProperItem()}</EditedMobileContentWrapper>
    </>
  );
};

const mapStateToProps = state => ({
  emailVerificationChallengeStatus: getEmailVerificationChallengeStatus(state),
  token: selectors.getToken(state)
});

const mapDispatchToProps = dispatch => ({
  handleChallenge: (emailAddress, verificationCode) => {
    dispatch(actions.verifyEmailChallenge(emailAddress, verificationCode));
  },
  handleResendSubmit: token => {
    dispatch(actions.verifyEmail(token));
  }
});

const ConnectedEmailVerification = connect(mapStateToProps, mapDispatchToProps)(EmailVerification);

const reflection = {
  component: ConnectedEmailVerification,
  layout: Sparse,
  layoutProps: {
    title: 'Evry Member Portal',
    subtitle: 'Email Verification'
  },
  route: '/email-verification'
};

export default EmailVerification;

export { reflection };
