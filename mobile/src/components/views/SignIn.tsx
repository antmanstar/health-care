import React from 'react';
import styled from 'styled-components/native';
import defaultTheme from '../../style/themes';
import { Link } from "react-router-native";


interface SignInProps {
  handleSubmit: () => void
  handleTwoFactorSubmit: () => void
  handleClear2FA: () => void
  payload2FA: {
    email_address: string
    two_way_factor_challenge_required: boolean
    two_way_factor_sent_to: string
    two_way_factor_token: string
  }
}

const {
  MobileContentWrapper,
  MobileFixedBottomButton,
  MobileSectionBackground,
  SectionDivider
} = defaultTheme.components;

type styledProps = { theme: typeof defaultTheme }

const OuterWrapper = styled.View`
  display: flex;
  align-items: stretch;
  justify-content: flex-end;
  box-sizing: border-box;
  flex-direction: column;
  width: 100%;
  flex: 1;
`;

const Wrapper = styled(MobileSectionBackground)`
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
`;

const InputWrapper = styled.View`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;

  input {
    flex: 1;
    padding: 16px 16px 16px 0;
    font-size: 16px;
    font-weight: 300;
    border: none;
    outline: none;
    caret-color: ${(props: styledProps) => props.theme.colors.shades.pinkOrange};

    ::placeholder {
      color: ${(props: styledProps) => props.theme.colors.shades.gray};
    }
  }

  i {
    color: ${(props: styledProps) => props.theme.colors.shades.mediumGray};
  }
`;

const SignInButton = styled.Button`
  box-sizing: border-box;
  width: 100%;
  padding: 16px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 1.25px;
  text-transform: uppercase;
  text-align: center;
  background: ${(props: styledProps) => props.theme.gradients.main};
  color: ${(props: styledProps) => props.theme.colors.shades.white};
  outline: none;
  border: none;
  border-radius: 0 0 4px 4px;
`;

const PasswordRecovery = styled.View`
  padding: 8px 0 16px;
  font-size: 14px;
  text-align: right;

  a {
    color: ${(props: styledProps) => props.theme.colors.shades.pinkOrange};
    text-decoration: none;
  }
`;

const GoToRegistration = styled(MobileFixedBottomButton)`
  p {
    margin: 0 0 4px;
  }

  a {
    font-size: 14px;
    color: ${(props: styledProps) => props.theme.colors.shades.pinkOrange};
  }
`;

const SignIn = (props: SignInProps) => {
  const { handleClear2FA, handleSubmit, handleTwoFactorSubmit, payload2FA } = props
  return (
    <OuterWrapper>
      <MobileContentWrapper>
        {payload2FA && payload2FA.two_way_factor_challenge_required ? (
          <>
            <form onSubmit={handleTwoFactorSubmit}>
              <input
                type="hidden"
                value={payload2FA.two_way_factor_token}
                name="twoFactorToken"
              />
              <input type="hidden" value={payload2FA.email_address} name="email" />
              <Wrapper>
                <InputWrapper>
                  <input
                    type="text"
                    autoComplete="off"
                    name="idCode"
                    placeholder={`Enter Code Sent To ${payload2FA.two_way_factor_sent_to}`}
                  />
                  <i className="material-icons">lock</i>
                </InputWrapper>
                <SignInButton title="Finish Sign In" />
              </Wrapper>
            </form>
            <GoToRegistration>
              <Link to="/" onPress={handleClear2FA}>
                Start Over
              </Link>
            </GoToRegistration>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <Wrapper>
              <InputWrapper>
                <input
                  autoComplete="username"
                  placeholder="Email Address"
                  type="email"
                  name="email"
                  id="email"
                />
                <i className="material-icons">mail_outline</i>
              </InputWrapper>
              <SectionDivider />
              <InputWrapper>
                <input
                  autoComplete="current-password"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                />
                <i className="material-icons">lock</i>
              </InputWrapper>
              <SignInButton title="Sign In" />
            </Wrapper>
          </form>
        )}
        <PasswordRecovery>
          <Link to="/password-reset">Forgot your password?</Link>
        </PasswordRecovery>
        {this.renderAuthError()}
      </MobileContentWrapper>
      <GoToRegistration>
        <p>Don&apos;t have an account?</p>
        <Link to="/register">Register a new one.</Link>
      </GoToRegistration>
    </OuterWrapper>
  );
}

export {
  SignIn
}