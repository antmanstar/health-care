import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import defaultTheme from '../../style/themes';
import { Helmet } from 'react-helmet-async';
import CheckCircle from '@evry-member-app/assets/images/vector/check-in-circle.svg';
import Negative from '@evry-member-app/assets/images/vector/feedback-negative.svg';
import { Link as RouterLink } from 'react-router-dom';
import queryString from 'query-string';
import { Sparse } from '../layouts';
import StyledLoadingSpinner from '../presentation/shared/Loader/StyledLoadingSpinner';

import { connect } from 'react-redux';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';

const {
  getEmailVerificationChallengeStatus
} = selectors;

const { MobileContentWrapper } = defaultTheme.components;

const EditedMobileContentWrapper = styled(MobileContentWrapper)`
  padding-top: 48px;
`;

const Container = styled.div`
  display: grid;
  justify-content: center;
  grid-template-areas: "check text .";
  grid-template-columns: 1fr auto 1fr;
  column-gap: 50px;

  @media (max-width: 1000px) {
    grid-template-areas: "check" "text"; 
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
  margin: 100px 0 50px 0;

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
  padding: 25px 0 50px 0;
`;

const VerificationContainer = styled.div`
  display: flex;
  flex-direction: column;            
  grid-area: text;
  place-self: center;
`;

const Center = styled.div`
  align-self: center;
  max-width: 300px;
  width: 100%;
`;

const EmailResentAlert = styled.div`
  text-align: center;
  color: #8ED081;
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
`;

const EmailVerification = props => {
  const [ resendClicked, setResendClicked ] = useState(false);

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
          <StyledLoadingSpinner type="TailSpin" color="#00BFFF" />
        </VerificationContainer>
      </Container>
    );
  }


  function renderVerificationFailure() {
    return (
      <Container>
        <FeedbackIcon src={Negative} />
        <VerificationContainer>
          <Header>Verification Failure!</Header>
          <Separator />
          <Body>
            Your email verification link has expired.
            Click here to resend a new verification link.
          </Body>
          <Separator />
          <Center>
            <RouterLink to="/">
              <ActionButton bgColor="#022B40" onClick={handleResend}>Resend</ActionButton>
              {resendClicked && <EmailResentAlert>Your email verification has been submitted. Please check your email inbox.</EmailResentAlert>}
            </RouterLink>
          </Center>
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
          <Body>
            Thanks for verifying your email!
            Click the button below to continue.
          </Body>
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
      case "":
      case undefined: return renderLoading();
      case "failure": return renderVerificationFailure();
      case "success": return renderVerificationSuccess();
      default: return renderLoading();
    }
  }

  return (
    <>
      <Helmet>
        <title>{reflection.layoutProps.title} - Evry Health</title>
      </Helmet>
      <EditedMobileContentWrapper>
        {renderProperItem()}
      </EditedMobileContentWrapper>
    </>
  );
}

const mapStateToProps = state => ({
  emailVerificationChallengeStatus: getEmailVerificationChallengeStatus(state),
  token: selectors.getToken(state)
});

const mapDispatchToProps = dispatch => ({
  handleChallenge: (emailAddress, verificationCode) => {
    dispatch(actions.verifyEmailChallenge(emailAddress, verificationCode));
  },
  handleResendSubmit: (token) => {
    dispatch(actions.verifyEmail(token));
  }
});

const ConnectedEmailVerification = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailVerification);

const reflection = {
  component: ConnectedEmailVerification,
  layout: Sparse,
  layoutProps: {
    title: 'Evry Member Portal',
    subtitle: "Email Verification"
  },
  route: '/email-verification'
};

export default EmailVerification;

export { reflection };
