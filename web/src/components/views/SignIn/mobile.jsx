import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import values from 'lodash/values';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { Mobile } from '../../layouts';
import ErrorMessage from '../../presentation/shared/mobile/ErrorMessage';
import defaultTheme from '../../../style/themes';
import actions from '@evry-member-app/shared/store/actions';
import selector from '@evry-member-app/shared/store/selectors';
import StyledLoadingSpinner from '../../presentation/shared/Loader/StyledLoadingSpinner';

const { getAuthError, getPayload2FA, isSigningIn } = selector;
const { authenticate, clearAuthError, clear2FA, verify2FACode } = actions;

// MOBILE: Sign In View
// TODO: 2FA code should be abstracted out and used / shared between mobile/desktop

const {
  MobileContentWrapper,
  MobileFixedBottomButton,
  MobileSectionBackground,
  SectionDivider
} = defaultTheme.components;

const OuterWrapper = styled.div`
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

const InputWrapper = styled.div`
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
    caret-color: ${props => props.theme.colors.shades.pinkOrange};

    ::placeholder {
      color: ${props => props.theme.colors.shades.gray};
    }
  }

  i {
    color: ${props => props.theme.colors.shades.mediumGray};
  }
`;

const SignInButton = styled.button`
  box-sizing: border-box;
  width: 100%;
  padding: 16px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 1.25px;
  text-transform: uppercase;
  text-align: center;
  background: ${props => props.theme.gradients.main};
  color: ${props => props.theme.colors.shades.white};
  outline: none;
  border: none;
  border-radius: 0 0 4px 4px;
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

const GoToRegistration = styled(MobileFixedBottomButton)`
  p {
    margin: 0 0 4px;
  }

  a {
    font-size: 14px;
    color: ${props => props.theme.colors.shades.pinkOrange};
  }
`;

class MobileSignIn extends PureComponent {
  componentDidMount() {
    const { handleClearAuthError, authError } = this.props;
    if (authError && authError.data) {
      handleClearAuthError();
    }
  }

  renderAuthError() {
    const { authError } = this.props;
    let authErrorMessage = null;
    if (authError && authError.data) {
      authErrorMessage = <ErrorMessage message={values(authError.data).join('')} />;
    }
    return authErrorMessage;
  }

  render() {
    const { handleSubmit, handleTwoFactorSubmit, payload2FA, handleClear2FA, isSigningIn } = this.props;

    return (
      <OuterWrapper>
        <MobileContentWrapper>
          {payload2FA && payload2FA.two_way_factor_challenge_required ? (
            <>
              <form autoComplete="false" onSubmit={handleTwoFactorSubmit}>
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
                  <SignInButton type="submit" value="Finish Sign In">
                    Finish Sign In
                  </SignInButton>
                </Wrapper>
              </form>
              <GoToRegistration>
                <RouterLink to="/" onClick={handleClear2FA}>
                  Start Over
                </RouterLink>
              </GoToRegistration>
            </>
          ) : (
            <form autoComplete="false" onSubmit={handleSubmit}>
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
                <SignInButton type="submit" value="Sign In">
                  Sign In
                </SignInButton>
              </Wrapper>
            </form>
          )}
          <PasswordRecovery>
            <RouterLink to="/password-reset">Forgot your password?</RouterLink>
          </PasswordRecovery>
          {this.renderAuthError()}
        </MobileContentWrapper>
        <GoToRegistration>
          <p>Don&apos;t have an account?</p>
          <RouterLink to="/register">Register a new one.</RouterLink>
        </GoToRegistration>
        {
          isSigningIn && <StyledLoadingSpinner type="TailSpin" color = "#00BFFF" />
        }
      </OuterWrapper>
    );
  }
}

MobileSignIn.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleTwoFactorSubmit: PropTypes.func.isRequired,
  handleClearAuthError: PropTypes.func.isRequired,
  handleClear2FA: PropTypes.func.isRequired,
  isSigningIn: PropTypes.bool,
  authError: PropTypes.shape({}),
  payload2FA: PropTypes.shape({})
};

MobileSignIn.defaultProps = {
  authError: null,
  payload2FA: null
};

const mapStateToProps = state => ({
  isSigningIn: isSigningIn(state),
  authError: getAuthError(state),
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

const ConnectedSignIn = connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileSignIn);

const reflection = {
  component: ConnectedSignIn,
  layout: Mobile,
  layoutProps: {
    signIn: true,
    titleWrapperClass: 'sign-in'
  },
  route: '/sign-in'
};

export default ConnectedSignIn;

export { reflection };
