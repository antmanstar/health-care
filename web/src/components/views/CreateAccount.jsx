import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Sparse } from '../layouts';
import defaultTheme from '../../style/themes';
import Button from '../presentation/shared/desktop/Button';
import PasswordStrengthMeter from '../presentation/shared/desktop/PasswordStrengthMeter';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import history from '../../utils/history';

const { register } = actions;
const {
  getAuthError,
  getRegisteringUser,
  isVerifiedRegisteringUser,
  successfulRegistration
} = selectors;

// Create Account View
// TODO: Submit account creation, add pw strength indicator, put form values into state

const { LayoutWrapper, Input, SectionDivider, TwoColumnRow } = defaultTheme.components;

const SmallContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 16px;
  @media ${props => props.theme.device.tablet} {
    width: 48%;
    margin-bottom: 24px;
  }

  &:last-child {
    margin-bottom: 0;
  }

  > .push-down {
    margin-top: auto;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 400;
  color: ${props => props.theme.colors.shades.blue};
`;

const EditedTwoColumnRow = styled(TwoColumnRow)`
  padding: 32px 0 16px;
  flex-wrap: wrap;
  margin-bottom: 0;
`;

const Label = styled.p`
  margin: 0 0 16px;
  font-size: 18px;
  font-weight: 400;
  color: ${props => props.theme.colors.shades.blue};
`;

const PasswordLabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;

  p {
    margin: 0;
  }
`;

const ShowPassword = styled.button`
  border: none;
  outline: none;
  font-size: 12px;
  font-style: italic;
  color: ${props => props.theme.colors.shades.gray};
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.colors.shades.darkGray};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 32px;
`;

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showPassword: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    const { successfulRegistration } = this.props;

    if (successfulRegistration) {
      history.push('/sign-in');
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { register } = this.props;
    const { email, password } = this.state;
    register({ email, password });
  }

  render() {
    const { isVerifiedRegisteringUser } = this.props;

    if (!isVerifiedRegisteringUser) {
      return <Redirect to="/register" />;
    }

    const { showPassword, password } = this.state;

    return (
      <LayoutWrapper>
        <Title>Create your online account.</Title>
        <SectionDivider />
        <form autoComplete="false">
          <EditedTwoColumnRow>
            <SmallContainer>
              <Label htmlFor="email">Email Address</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email address."
                onChange={this.handleChange}
              />
            </SmallContainer>
            <SmallContainer>
              <PasswordLabelWrapper>
                <Label htmlFor="password">Choose a Password</Label>
                <ShowPassword
                  type="button"
                  onClick={() => {
                    this.setState({
                      showPassword: !showPassword
                    });
                  }}
                >
                  {showPassword !== true ? 'show password' : 'hide password'}
                </ShowPassword>
              </PasswordLabelWrapper>
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                autoComplete="off"
                name="password"
                id="password"
                placeholder="Choose a password."
                onChange={this.handleChange}
              />
              <PasswordStrengthMeter password={password} />
            </SmallContainer>
          </EditedTwoColumnRow>
          <SectionDivider />
          <ButtonWrapper>
            <Button
              buttonType="submit"
              value="Register Account"
              text="Register Account"
              onClick={this.handleSubmit}
            />
            <Button value="Cancel" text="Cancel" type="negative" />
          </ButtonWrapper>
        </form>
      </LayoutWrapper>
    );
  }
}

CreateAccount.propTypes = {
  isVerifiedRegisteringUser: PropTypes.bool,
  register: PropTypes.func,
  registeringUser: PropTypes.shape({}),
  successfulRegistration: PropTypes.bool
};

CreateAccount.defaultProps = {
  isVerifiedRegisteringUser: false,
  register: () => {},
  registeringUser: null,
  successfulRegistration: false
};

const mapStateToProps = state => ({
  authError: getAuthError(state),
  isVerifiedRegisteringUser: isVerifiedRegisteringUser(state),
  registeringUser: getRegisteringUser(state),
  successfulRegistration: successfulRegistration(state)
});

const mapDispatchToProps = dispatch => ({
  register: ({ eligibilityId, email, last4SSN, password, passwordConfirm }) => {
    dispatch(register({ eligibilityId, email, last4SSN, password, passwordConfirm }));
  }
});

const mergeProps = ({ registeringUser, ...stateProps }, { register }, ownProps) => ({
  register: ({ email, password }) => {
    const { eligibilityId, last4SSN } = registeringUser;
    register({ eligibilityId, email, last4SSN, password, passwordConfirm: password });
  },
  ...stateProps,
  ...ownProps
});

const ConnectedCreateAccount = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(CreateAccount);

const reflection = {
  component: ConnectedCreateAccount,
  layout: Sparse,
  layoutProps: {
    title: 'Register your account.',
    subtitle: 'Enter your details to confirm your Evry Membership and setup your online account.'
  },
  route: '/create-account'
};

export default CreateAccount;

export { reflection };
