import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import queryString from 'query-string';
import styled from 'styled-components';
import { Sparse } from '../../layouts';
import defaultTheme from '../../../style/themes';
import Button from '../../presentation/shared/desktop/Button';
import PasswordStrengthMeter from '../../presentation/shared/desktop/PasswordStrengthMeter';
import ErrorMessage from '../../presentation/shared/desktop/ErrorMessage';
import actions from '@evry-member-app/shared/store/actions';
import selector from '@evry-member-app/shared/store/selectors';
import { Helmet } from 'react-helmet-async';

const { getAuthError } = selector;
const { initiatePasswordReset, savePasswordReset, clearAuthError } = actions;

// Desktop: Password Reset View

const { LayoutWrapper, Input, TwoColumnRow, SectionDivider } = defaultTheme.components;

const SmallContainer = styled.div`
  width: 80%;
  margin-bottom: 16px;
  margin-left: 10%;
  @media ${props => props.theme.device.tablet} {
    width: 48%;
    margin-bottom: 0;
    margin-left: 0;
    &.center {
      margin-left: 26%;
    }
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const GoToRegistration = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 60px;
  flex-direction: column;
  text-align: center;

  p {
    display: block;
    color: ${props => props.theme.colors.shades.gray};
  }

  a {
    margin-left: 8px;
    color: ${props => props.theme.colors.shades.pinkOrange};
  }
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
  }
`;

class DesktopPasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initiatePasswordResetSubmission: false,
      resetPasswordSubmission: false,
      password: ''
    };

    this.handlers = {
      handleResetSubmission: this.handleResetSubmission.bind(this),
      handleInitialSubmission: this.handleInitialSubmission.bind(this),
      handleChange: this.handleChange.bind(this)
    };
  }

  componentDidMount() {
    const { handleClearAuthError } = this.props;
    handleClearAuthError();
    this.setState({ resetPasswordSubmission: false, initiatePasswordResetSubmission: false });
  }

  handleChange(event) {
    this.setState({ password: event.target.value });
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
    if (authError) {
        authErrorMessage = <ErrorMessage message={authError} />;
    }
    return authErrorMessage;
  }

  render() {
    const { location, authError } = this.props;
    const { initiatePasswordResetSubmission, resetPasswordSubmission, password } = this.state;
    const queryParams = queryString.parse(location.search);
    return (
      <LayoutWrapper>
        <Helmet>
          <title>{reflection.layoutProps.title} - Evry Health</title>
        </Helmet>
        <Title>Password Reset</Title>
        <SectionDivider />
        {queryParams.token ? (
          <>
            <form autoComplete="false" onSubmit={this.handlers.handleResetSubmission}>
              <EditedTwoColumnRow>
                <SmallContainer>
                  <input type="hidden" value={queryParams.token} name="token" />
                  <input type="hidden" value={queryParams.email} name="email" />
                  <Input
                    type="password"
                    autoComplete="off"
                    name="newPassword"
                    onChange={this.handlers.handleChange}
                    placeholder="New Password"
                    value={password}
                  />
                  <PasswordStrengthMeter password={password} />
                </SmallContainer>
                <SmallContainer>
                  <Input
                    type="password"
                    placeholder="Confirm New Password"
                    autoComplete="off"
                    name="newPasswordConfirm"
                  />
                </SmallContainer>
              </EditedTwoColumnRow>
              <ButtonWrapper>
                <Button
                  buttonType="submit"
                  value="Complete Password Reset"
                  text="Complete Password Reset"
                />
              </ButtonWrapper>
            </form>
            {this.renderAuthError()}
            {resetPasswordSubmission && !authError && (
              <Copy>
                Your password has been reset.
                <RouterLink to="/sign-in">Go back to Sign in.</RouterLink>
              </Copy>
            )}
          </>
        ) : (
          <>
            <form autoComplete="false" onSubmit={this.handlers.handleInitialSubmission}>
              <EditedTwoColumnRow>
                <SmallContainer className="center">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    autoComplete="username"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email Address"
                  />
                </SmallContainer>
              </EditedTwoColumnRow>
              <ButtonWrapper>
                <Button buttonType="submit" value="Reset" text="Reset" />
              </ButtonWrapper>
            </form>
            {this.renderAuthError()}
            {initiatePasswordResetSubmission && !authError && (
              <Copy>Your email reset has been submitted. Please check your email inbox.</Copy>
            )}
          </>
        )}
        <GoToRegistration>
          <p>
            Don&apos;t have an account?
            <RouterLink to="/register">Register a new one.</RouterLink>
          </p>
          <p>
            Or
            <RouterLink to="/sign-in">Ready to Sign in.</RouterLink>
          </p>
        </GoToRegistration>
      </LayoutWrapper>
    );
  }
}

DesktopPasswordReset.propTypes = {
  handleSubmit: PropTypes.func,
  handleReset: PropTypes.func,
  location: PropTypes.shape({}).isRequired,
  handleClearAuthError: PropTypes.func.isRequired,
  authError: PropTypes.shape({})
};

DesktopPasswordReset.defaultProps = {
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
)(DesktopPasswordReset);

const reflection = {
  component: ConnectedPasswordReset,
  layout: Sparse,
  layoutProps: {
    title: 'Password Reset',
    subtitle: "Enter your email address and we'll send you a link to reset your password."
  },
  route: '/password-reset'
};

export default ConnectedPasswordReset;

export { reflection };
