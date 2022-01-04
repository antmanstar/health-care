import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import values from 'lodash/values';
import { Link as RouterLink } from 'react-router-dom';
import queryString from 'query-string';
import styled from 'styled-components';
import { Mobile } from '../../layouts';
import ErrorMessage from '../../presentation/shared/mobile/ErrorMessage';
import defaultTheme from '../../../style/themes';
import actions from '@evry-member-app/shared/store/actions';
import selector from '@evry-member-app/shared/store/selectors';

const { getAuthError } = selector;
const { initiatePasswordReset, savePasswordReset, clearAuthError } = actions;

// MOBILE: Password Reset View

const {
  MobileContentWrapper,
  MobileFixedBottomButton,
  MobileSectionBackground
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

const ResetButton = styled.button`
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

const Copy = styled.p`
  display: block;
  width: 100%;
  padding-top: 20px;
  text-align: center;
  line-height: 1.35em;
  font-size: 15px;

  a {
    margin-top: 30px;
    display: block;
    color: ${props => props.theme.colors.shades.pinkOrange};
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

class MobilePasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initiatePasswordResetSubmission: false,
      resetPasswordSubmission: false
    };

    this.handlers = {
      handleResetSubmission: this.handleResetSubmission.bind(this),
      handleInitialSubmission: this.handleInitialSubmission.bind(this)
    };
  }

  componentDidMount() {
    const { handleClearAuthError } = this.props;
    handleClearAuthError();
    this.setState({ resetPasswordSubmission: false, initiatePasswordResetSubmission: false });
  }

  handleResetSubmission(e) {
    const { handleClearAuthError, handleReset } = this.props;
    handleClearAuthError();
    this.setState({ resetPasswordSubmission: true }, handleReset(e));
  }

  handleInitialSubmission(e) {
    const { handleClearAuthError, handleSubmit } = this.props;
    handleClearAuthError();
    this.setState({ initiatePasswordResetSubmission: true }, handleSubmit(e));
  }

  renderAuthError() {
    const { authError } = this.props;
    let authErrorMessage = null;
    if (authError && authError.data) {
      // TODO: until the server makes errors consistent, we could always enumerate through
      // any `data` keys, on error, and spit out the values, no matter what they are.
      const message = values(authError.data).join('');

      if (message) {
        authErrorMessage = <ErrorMessage message={message.toString()} />;
      }
    }
    return authErrorMessage;
  }

  render() {
    const { location, authError } = this.props;
    const { initiatePasswordResetSubmission, resetPasswordSubmission } = this.state;
    const queryParams = queryString.parse(location.search);
    return (
      <OuterWrapper>
        <MobileContentWrapper>
          {queryParams.token ? (
            <>
              <form autoComplete="false" onSubmit={this.handlers.handleResetSubmission}>
                <Wrapper>
                  <InputWrapper>
                    <input type="hidden" value={queryParams.token} name="token" />
                    <input type="hidden" value={queryParams.email} name="email" />
                    <input type="password" name="newPassword" placeholder="New Password" />
                    <i className="material-icons">lock</i>
                  </InputWrapper>
                  <InputWrapper>
                    <input
                      type="password"
                      name="newPasswordConfirm"
                      placeholder="Confirm New Password"
                    />
                    <i className="material-icons">lock</i>
                  </InputWrapper>
                  <ResetButton type="submit" value="Complete Password Reset">
                    Complete Password Reset
                  </ResetButton>
                </Wrapper>
              </form>
              {this.renderAuthError()}
              {resetPasswordSubmission && !authError ? (
                <Copy>
                  Your password has been reset.
                  <RouterLink to="/sign-in">Go back to Sign in.</RouterLink>
                </Copy>
              ) : (
                <Copy>
                  <RouterLink to="/sign-in">Want to Sign In?</RouterLink>
                </Copy>
              )}
            </>
          ) : (
            <>
              <form autoComplete="false" onSubmit={this.handlers.handleInitialSubmission}>
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
                  <ResetButton type="submit" value="Reset">
                    Reset
                  </ResetButton>
                </Wrapper>
              </form>
              <Copy>
                Enter a valid Evry Member email address, and we'll send you instruction on resetting
                your password.
                <br />
                <RouterLink to="/sign-in">Ready to Sign in?</RouterLink>
              </Copy>
              {this.renderAuthError()}
              {initiatePasswordResetSubmission && !authError && (
                <Copy>Your email reset has been submitted. Please check your email inbox.</Copy>
              )}
            </>
          )}
        </MobileContentWrapper>
        <GoToRegistration>
          <p>Don&apos;t have an account?</p>
          <RouterLink to="/register">Register a new one.</RouterLink>
        </GoToRegistration>
      </OuterWrapper>
    );
  }
}

MobilePasswordReset.propTypes = {
  handleSubmit: PropTypes.func,
  handleReset: PropTypes.func,
  location: PropTypes.shape({}).isRequired,
  handleClearAuthError: PropTypes.func.isRequired,
  authError: PropTypes.shape({})
};

MobilePasswordReset.defaultProps = {
  handleSubmit: undefined,
  handleReset: undefined,
  authError: null
};

const mapStateToProps = state => ({
  authError: getAuthError(state)
});

const mapDispatchToProps = dispatch => ({
  handleSubmit: e => {
    const { email } = e.target.elements;
    e.preventDefault();
    dispatch(initiatePasswordReset(email.value));
  },
  handleReset: e => {
    const { email, newPassword, newPasswordConfirm, token } = e.target.elements;
    e.preventDefault();
    dispatch(
      savePasswordReset(email.value, newPassword.value, newPasswordConfirm.value, token.value)
    );
  },
  handleClearAuthError: () => {
    dispatch(clearAuthError());
  }
});

const ConnectedPasswordReset = connect(
  mapStateToProps,
  mapDispatchToProps
)(MobilePasswordReset);

const reflection = {
  component: ConnectedPasswordReset,
  layout: Mobile,
  layoutProps: {
    signIn: true,
    titleWrapperClass: 'sign-in'
  },
  route: '/password-reset'
};

export default ConnectedPasswordReset;

export { reflection };
