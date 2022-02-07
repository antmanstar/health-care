import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import queryString from 'query-string';
import styled from 'styled-components';
import { Sparse } from '../layouts';
import defaultTheme from '../../style/themes';
import Button from '../presentation/shared/desktop/Button';
import PasswordStrengthMeter from '../presentation/shared/desktop/PasswordStrengthMeter';
import ErrorMessage from '../presentation/shared/desktop/ErrorMessage';
import actions from '@evry-member-app/shared/store/actions';
import selector from '@evry-member-app/shared/store/selectors';
import { Helmet } from 'react-helmet-async';
import MessageAlert from "./MessageAlert";
import history from '../../utils/history';

const { getAuthError } = selector;
const { initiatePasswordReset, savePasswordReset, clearAuthError } = actions;

// Desktop: Password Reset View

const { LayoutWrapper, Input, TwoColumnRow, SectionDivider } = defaultTheme.components;

const SmallContainer = styled.div`
  margin-bottom: 0;
  margin-left: 0;
  width: 100%;

  &:last-child {
    margin-left: 0;
    margin-bottom: 0;
  }
`;

const WrapperContainer = styled(SmallContainer)`
  &:last-child {
    margin-left: 0;

    @media ${props => props.theme.device.tabletXL} {
      margin-left: 50px;
    }
  }
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 400;
  color: ${props => props.theme.colors.shades.blue};
`;

const EditedTwoColumnRow = styled(TwoColumnRow)`
  padding: 32px 0 16px 0;
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
  margin-top: 32px;
`;

const GoToRegistration = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 200px;
  flex-direction: row;
  text-align: center;
  align-items: center;
  margin-top: auto;

  p {
    display: block;
    color: ${props => props.theme.colors.shades.gray};
  }

  a {
    margin-left: 8px;
    color: ${props => props.theme.colors.shades.pinkOrange};
  }
`;

const Body = styled.div`
  width: 100%;

  @media ${props => props.theme.device.tabletXL} {
    width: 60%;
  }
`;

const WideButton = styled(Button)`
  width: 200px;
`;

const BottomText = styled.span`
  font-size: 20px;
`;

const TextLabel = styled.div`
  font-weight: 500;
  margin-bottom: 10px;
  margin-left: 3px;
`;

const VSeparator = styled.div`
  border-right: 2px solid #eee;
  height: 30px;
  margin: 0 20px;
`;

const Separator = styled.div`
  border-bottom: 1px solid #ddd;
  width: 100%;
  margin: 25px 0;
`;

const ShowPassword = styled.button`
  border: none;
  outline: none;
  font-size: 12px;
  font-style: italic;
  color: ${props => props.theme.colors.shades.gray};
  cursor: pointer;
  float: right;
  &:hover {
    color: ${props => props.theme.colors.shades.darkGray};
  }
`;

const MatchingMessage = styled.div`
  font-weight: 500;
  color: ${props => props.color};
`;

class DesktopPasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initiatePasswordResetSubmission: false,
      resetPasswordSubmission: false,
      password: '',
      confirmPassword: '',
      showPassword: false
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

  handleChange = (event) => {
    this.setState({ password: event.target.value });
  }

  handleConfirmPasswordChange = (event) => {
    this.setState({ confirmPassword: event.target.value });
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

    return authError ? <ErrorMessage message={authError} /> : null;
  }

  toggleShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  }

  renderPasswordsMatchString = () => {
    if (this.state.password.length === 0 && this.state.confirmPassword.length === 0) {
      return null;
    }

    const isMatch = this.state.password === this.state.confirmPassword;
    const message = isMatch ? "Passwords Match" : "Passwords don't match";
    const color = isMatch ? "#8ED081" : "#F57982";

    return <MatchingMessage color={color}>{message}</MatchingMessage>;
  }

  renderEnterNewPassword() {
    const { location, authError } = this.props;
    const { resetPasswordSubmission, password, confirmPassword } = this.state;
    const queryParams = queryString.parse(location.search);

    return (
      <>
        <Title>Enter a new password.</Title>
        <SectionDivider />
        <form autoComplete="false" onSubmit={this.handlers.handleResetSubmission}>
          <EditedTwoColumnRow>
            <WrapperContainer>
              <input type="hidden" value={queryParams.token} name="token" />
              <input type="hidden" value={queryParams.email} name="email" />
              <ShowPassword type="button" tabIndex="-1" onClick={this.toggleShowPassword}>
                {this.state.showPassword ? 'hide password' : 'show password'}
              </ShowPassword>
              <TextLabel>New Password</TextLabel>
              <Input
                type={this.state.showPassword ? 'text' : 'password'}
                autoComplete="off"
                name="newPassword"
                onChange={this.handleChange}
                placeholder="New Password"
                value={password}
              />
              <PasswordStrengthMeter password={password} />
            </WrapperContainer>
            <WrapperContainer>
              <ShowPassword type="button" tabIndex="-1" onClick={this.toggleShowPassword}>
                {this.state.showPassword ? 'hide password' : 'show password'}
              </ShowPassword>
              <TextLabel>Confirm Password</TextLabel>
              <Input
                type={this.state.showPassword ? 'text' : 'password'}
                placeholder="Confirm New Password"
                autoComplete="off"
                name="newPasswordConfirm"
                onChange={this.handleConfirmPasswordChange}
                value={confirmPassword}
              />
              {this.renderPasswordsMatchString()}
            </WrapperContainer>
          </EditedTwoColumnRow>
          <ButtonWrapper>
            <WideButton
              buttonType="submit"
              value="Done"
              text="Done"
            />
          </ButtonWrapper>
        </form>
        {this.renderAuthError()}
      </>
    );
  }

  renderResetPassword() {
    const { authError } = this.props;
    const { initiatePasswordResetSubmission } = this.state;

    return (
      <>
        <Title>Forgot Password?</Title>
        <Separator />
        <Body>
          After pressing the button below, please check your email for the password reset link.
          If you haven't got it, you can use the button below to send it again.
        </Body>
        <SectionDivider />
        <form autoComplete="false" onSubmit={this.handlers.handleInitialSubmission}>
          <EditedTwoColumnRow>
            <SmallContainer className="center">
              <Label htmlFor="email">Email Address</Label>
              <Input
                autoComplete="username"
                type="email"
                name="email"
                id="email"
                placeholder="example@domain.com"
              />
            </SmallContainer>
          </EditedTwoColumnRow>
          <Separator />
          <ButtonWrapper>
            <WideButton buttonType="submit" value="Send Link" text="Send Link" />
          </ButtonWrapper>
        </form>
        {this.renderAuthError()}
        {initiatePasswordResetSubmission && authError && authError.length === 0 && (
          <MessageAlert>Your password reset has been submitted. Please check your email inbox.</MessageAlert>
        )}
      </>
    );
  }

  render() {
    const queryParams = queryString.parse(this.props.location.search);

    const { authError } = this.props;
    const { resetPasswordSubmission } = this.state;

    if (queryParams.token && resetPasswordSubmission && authError && authError.length === 0) {
      history.push("/password-reset-success");
    }

    return (
      <>
        <LayoutWrapper>
          <Helmet>
            <title>{reflection.layoutProps.title} - Evry Health</title>
          </Helmet>
          {queryParams.token ? this.renderEnterNewPassword() : this.renderResetPassword()}
        </LayoutWrapper>
        <GoToRegistration>
          <p>
            <BottomText>Don&apos;t have an account yet?</BottomText>
            <RouterLink to="/register">Register your account</RouterLink>
          </p>
          <VSeparator />
          <p>
            <BottomText>Already have an account?</BottomText>
            <RouterLink to="/sign-in">Sign in</RouterLink>
          </p>
        </GoToRegistration>
      </>
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
    title: 'Evry Member Portal',
    subtitle: "Reset your password."
  },
  route: '/password-reset'
};

export default ConnectedPasswordReset;

export { reflection };
