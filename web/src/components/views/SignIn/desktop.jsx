import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import values from 'lodash/values';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { Sparse } from '../../layouts';
import defaultTheme from '../../../style/themes';
import Button from '../../presentation/shared/desktop/Button';
import ErrorMessage from '../../presentation/shared/desktop/ErrorMessage';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import Interpolation from '../../../utils/Interpolation';
import history from '../../../utils/history';
import { Helmet } from 'react-helmet-async';
import StyledLoadingSpinner from '../../presentation/shared/Loader/StyledLoadingSpinner';

const { authenticate, clearAuthError, clear2FA, verify2FACode } = actions;
const {
  getAuthError,
  isSigningIn,
  getPayload2FA,
  hasBasicInfo,
  isAuthenticated,
  isOnboardingComplete,
  successfulRegistration
} = selectors;

// DESKTOP: Sign In View
// TODO: 2FA code should be abstracted out and used / shared between mobile/desktop

const { LayoutWrapper, Input, TwoColumnRow, SectionDivider } = defaultTheme.components;

const SmallContainer = styled.div`
  width: 100%;
  margin-bottom: 16px;
  @media ${props => props.theme.device.tablet} {
    width: 48%;
    margin-bottom: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 400;
  color: ${props => props.theme.colors.shades.blue};
`;

const EditedTwoColumnRow = styled(TwoColumnRow)`
  padding: 32px 0;
  flex-wrap: wrap;
  margin-bottom: 0;

  @media ${props => props.theme.device.tabletXL} {
    flex-wrap: nowrap;
  }
`;

const Label = styled.p`
  margin: 0 0 16px;
  font-size: 18px;
  font-weight: 400;
  color: ${props => props.theme.colors.shades.blue};
`;

const PasswordRecovery = styled.div`
  padding: 8px 0 16px;
  font-size: 14px;
  text-align: right;

  a {
    color: ${props => props.theme.colors.shades.pinkOrange};
    text-decoration: none;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 32px;
`;

const GoToRegistration = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 80px;

  p {
    margin: 0;
    margin-right: 8px;
    color: ${props => props.theme.colors.shades.gray};
  }

  a {
    margin: 0;
    color: ${props => props.theme.colors.shades.pinkOrange};
  }
`;

const ErrorMessageWrapper = styled.div`
  margin-bottom: 20px;
`;

function SignIn({
  authError,
  handleSubmit,
  isSigningIn,
  handleTwoFactorSubmit,
  handleClearAuthError,
  handleClear2FA,
  hasBasicInfo,
  isAuthenticated,
  isOnboardingComplete,
  payload2FA
}) {
  useEffect(() => {
    if (isAuthenticated && hasBasicInfo && !isOnboardingComplete) {
      if (isOnboardingComplete) {
        history.push('/');
      } else {
        history.push('/onboarding');
      }
    } else if (authError && authError.data) {
      handleClearAuthError();
    }
  }, []);

  const renderAuthError = () => {
    let authErrorMessage = null;
    if (authError) {
      authErrorMessage = (
        <ErrorMessageWrapper>
          <ErrorMessage message={authError} />
        </ErrorMessageWrapper>
      );
    }
    return authErrorMessage;
  };

  return (
    <LayoutWrapper>
      <Helmet>
        <title>{reflection.layoutProps.title} - Evry Health</title>
      </Helmet>
      {payload2FA && payload2FA.two_way_factor_challenge_required ? (
        <>
          <Title>Enter Your Code</Title>
          <SectionDivider />
          <form autoComplete="false" onSubmit={handleTwoFactorSubmit}>
            <input type="hidden" value={payload2FA.two_way_factor_token} name="twoFactorToken" />
            <input type="hidden" value={payload2FA.email_address} name="email" />
            <Input
              type="text"
              autoComplete="off"
              name="idCode"
              placeholder={`Code Sent To ${payload2FA.two_way_factor_sent_to}`}
            />
            {renderAuthError()}
            <ButtonWrapper>
              <Button buttonType="submit" value="Finish Sign In" text="Finish Sign In" />
            </ButtonWrapper>
          </form>
          <GoToRegistration>
            <RouterLink to="/" onClick={handleClear2FA}>
              Start Over
            </RouterLink>
          </GoToRegistration>
        </>
      ) : (
        <>
          <Title>Sign In</Title>
          <SectionDivider />
          <form autoComplete="false" onSubmit={handleSubmit}>
            <EditedTwoColumnRow>
              <SmallContainer>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  autoComplete="username"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email address."
                  // className="error"
                />
              </SmallContainer>
              <SmallContainer>
                <Label htmlFor="password">Password</Label>
                <Input
                  autoComplete="current-password"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password."
                />
                <PasswordRecovery>
                  <RouterLink to="/password-reset">Forgot your password?</RouterLink>
                </PasswordRecovery>
              </SmallContainer>
            </EditedTwoColumnRow>
            {renderAuthError()}
            <SectionDivider />
            <ButtonWrapper>
              <Button buttonType="submit" value="Sign In" text="Sign In" />
            </ButtonWrapper>
          </form>
        </>
      )}
      <GoToRegistration>
        <p>Don&apos;t have an account yet?</p>
        <RouterLink to="/register">Register your account</RouterLink>
      </GoToRegistration>
      {isSigningIn && <StyledLoadingSpinner type="TailSpin" color="#00BFFF" />}
    </LayoutWrapper>
  );
}

SignIn.propTypes = {
  authError: PropTypes.shape({}),
  handleSubmit: PropTypes.func.isRequired,
  isSigningIn: PropTypes.bool,
  handleTwoFactorSubmit: PropTypes.func.isRequired,
  handleClearAuthError: PropTypes.func.isRequired,
  handleClear2FA: PropTypes.func.isRequired,
  hasBasicInfo: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  isOnboardingComplete: PropTypes.bool,
  payload2FA: PropTypes.shape({})
};

SignIn.defaultProps = {
  authError: null,
  hasBasicInfo: false,
  isOnboardingComplete: false,
  payload2FA: null
};

const mapStateToProps = state => ({
  isSigningIn: isSigningIn(state),
  authError: getAuthError(state),
  hasBasicInfo: hasBasicInfo(state),
  isAuthenticated: isAuthenticated(state),
  isOnboardingComplete: isOnboardingComplete(state),
  payload2FA: getPayload2FA(state)
});

const mapDispatchToProps = dispatch => ({
  handleTwoFactorSubmit: e => {
    const { email, twoFactorToken, idCode } = e.target.elements;
    e.preventDefault();
    dispatch(verify2FACode(email.value, idCode.value, twoFactorToken.value));
  },
  handleSubmit: e => {
    const { email, password } = e.target.elements;
    e.preventDefault();
    dispatch(authenticate(email.value, password.value));
  },
  handleClearAuthError: () => {
    dispatch(clearAuthError());
  },
  handleClear2FA: () => {
    dispatch(clear2FA());
  }
});

const ConnectedSignIn = connect(mapStateToProps, mapDispatchToProps)(SignIn);

const reflection = {
  component: ConnectedSignIn,
  layout: Sparse,
  layoutProps: {
    title: 'Evry Member Portal',
    subtitle: new Interpolation([
      'Enter your',
      state => (successfulRegistration(state) ? ' new' : ''),
      ' account credentials to sign in.'
    ])
  },
  route: '/sign-in'
};

export default ConnectedSignIn;

export { reflection };
