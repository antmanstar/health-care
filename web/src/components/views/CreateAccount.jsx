import React, { useState, useEffect } from 'react';
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
import ErrorMessage from '../presentation/shared/desktop/ErrorMessage';

const { register } = actions;
const {
  getAuthError,
  getRegisterError,
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
`;

const PasswordLabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;

  p {
    margin: 0;
    margin-right: 20px;
  }
`;

const PasswordHelp = styled.div`
  display: flex;
  color: ${props => props.theme.colors.shades.blue};
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
const ErrorWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.shades.pinkRed};
  p {
    margin-left: 16px;
  }
`;

function CreateAccount({
  authError,
  registerError,
  isVerifiedRegisteringUser,
  registeringUser,
  register,
  successfulRegistration,
  ...restProps
}) {
  console.log('restProps ', restProps);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (successfulRegistration) {
      history.push('/sign-in');
    }
    if (!isVerifiedRegisteringUser) {
      history.push('/register');
    }
  }, [successfulRegistration, isVerifiedRegisteringUser]);

  const handleChangeEmail = e => {
    setEmail(e.target.value);
  };

  const handleChangePassword = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    register({ email, password });
  };

  const renderRegisterError = () => {
    const message =
      registerError?.result !== undefined && !registerError?.result
        ? 'An error occured, Please try again.'
        : registerError?.error;
    if (message) {
      return <ErrorMessage message={message} />;
    }
    return null;
  };

  return (
    <LayoutWrapper>
      <Title>Create your online profile.</Title>
      <SectionDivider />
      {renderRegisterError()}
      <form autoComplete="false">
        <EditedTwoColumnRow>
          <SmallContainer>
            <Label htmlFor="email">Email Address</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email address."
              onChange={handleChangeEmail}
            />
          </SmallContainer>
          <SmallContainer>
            <PasswordLabelWrapper>
              <PasswordHelp>
                <Label htmlFor="password">Choose a Password</Label>
                <i className="material-icons">help_outline</i>
              </PasswordHelp>

              <ShowPassword
                type="button"
                onClick={() => {
                  setShowPassword(!showPassword);
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
              onChange={handleChangePassword}
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
            onClick={handleSubmit}
          />
        </ButtonWrapper>
      </form>
    </LayoutWrapper>
  );
}

CreateAccount.propTypes = {
  registerError: PropTypes.object,
  isVerifiedRegisteringUser: PropTypes.bool,
  register: PropTypes.func,
  registeringUser: PropTypes.shape({}),
  successfulRegistration: PropTypes.bool
};

CreateAccount.defaultProps = {
  registerError: null,
  isVerifiedRegisteringUser: false,
  register: () => {},
  registeringUser: null,
  successfulRegistration: false
};

const mapStateToProps = state => ({
  authError: getAuthError(state),
  registerError: getRegisterError(state),
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