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
import LoadingSpinnerScreen from '../presentation/shared/Loader/LoadingSpinnerScreen';
import ReactTooltip from 'react-tooltip';
import successImg from '@evry-member-app/assets/images/vector/success-ellipse.svg';

const { register } = actions;
const {
  getAuthError,
  getRegisterError,
  getRegisteringUser,
  isVerifiedRegisteringUser,
  successfulRegistration,
  isRegisteringElegibility
} = selectors;

// Create Account View
// TODO: Submit account creation, add pw strength indicator, put form values into state

const { LayoutWrapper, Input, SectionDivider, TwoColumnRow } = defaultTheme.components;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 400;
  color: ${props => props.theme.colors.shades.blue};

  @media ${props => props.theme.device.mobile} {
    text-align: center;
  }

  @media ${props => props.theme.device.tablet} {
    text-align: center;
  }

  @media ${props => props.theme.device.tabletXL} {
    text-align: center;
  }

  @media ${props => props.theme.device.desktop} {
    text-align: unset;
  }

  @media ${props => props.theme.device.desktopXL} {
    text-align: unset;
  }
`;

const EditedTwoColumnRow = styled(TwoColumnRow)`
  padding: 32px 0 16px 32px;
  flex-wrap: wrap;
  margin-bottom: 0;
  flex-direction: column;

  @media ${props => props.theme.device.mobile} {
    padding: 32px 32px 16px 32px;
    align-items: center;
  }

  @media ${props => props.theme.device.tablet} {
    padding: 32px 32px 16px 32px;
    align-items: center;
  }

  @media ${props => props.theme.device.tabletXL} {
    padding: 32px 32px 16px 32px;
    align-items: center;
  }

  @media ${props => props.theme.device.desktop} {
    padding: 32px 0 16px 32px;
    align-items: unset;
  }

  @media ${props => props.theme.device.desktopXL} {
    padding: 32px 0 16px 32px;
    align-items: unset;
  }
`;

const Label = styled.p`
  margin: 0 0 16px;
  font-size: 12px;
  font-weight: 400;
  color: #4a4a4b;
  padding: 36px 0 36px;
  width: 65%;

  @media ${props => props.theme.device.mobile} {
    text-align: center;
  }

  @media ${props => props.theme.device.tablet} {
    text-align: center;
  }

  @media ${props => props.theme.device.tabletXL} {
    text-align: center;
  }

  @media ${props => props.theme.device.desktop} {
    text-align: unset;
  }

  @media ${props => props.theme.device.desktopXL} {
    text-align: unset;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 32px;
`;
const SuccessWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media ${props => props.theme.device.tabletXL} {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
  }
`;

const SuccessIco = styled.img`
  width: 128px;
  height: 125px;
`;

const SignInButton = styled(Button)`
  background: #8ed081;
  border-radius: 4px;
`;
function RegisterSuccess({
  authError,
  registerError,
  isVerifiedRegisteringUser,
  registeringUser,
  register,
  successfulRegistration,
  isRegisteringElegibility,
  ...restProps
}) {
  const [password, setPassword] = useState('');

  useEffect(() => {
    // if (successfulRegistration) {
    //   history.push('/sign-in');
    // }
    if (!isVerifiedRegisteringUser) {
      history.push('/register');
    }
  }, [successfulRegistration, isVerifiedRegisteringUser]);

  const handleSubmit = e => {
    e.preventDefault();
    history.push('/sign-in');
  };

  return (
    <LayoutWrapper>
      <SuccessWrapper>
        <SuccessIco src={successImg} />
        <EditedTwoColumnRow>
          <Title>You’ve been registered!</Title>
          <SectionDivider />
          <Label>
            Thank you for registering an account with us. Use the login credentials you created to
            sign into your personalized dashboard.
          </Label>
          <SectionDivider />
        </EditedTwoColumnRow>
      </SuccessWrapper>

      <form autoComplete="false">
        <ButtonWrapper>
          <SignInButton
            buttonType="submit"
            value="Sign In"
            text="Sign In"
            onClick={handleSubmit}
            disabled={isRegisteringElegibility}
          />
        </ButtonWrapper>
      </form>
      {isRegisteringElegibility && <LoadingSpinnerScreen type="TailSpin" color="#00BFFF" />}
    </LayoutWrapper>
  );
}

RegisterSuccess.propTypes = {
  registerError: PropTypes.object,
  isVerifiedRegisteringUser: PropTypes.bool,
  register: PropTypes.func,
  registeringUser: PropTypes.shape({}),
  successfulRegistration: PropTypes.bool
};

RegisterSuccess.defaultProps = {
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
  successfulRegistration: successfulRegistration(state),
  isRegisteringElegibility: isRegisteringElegibility(state)
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

const ConnectedRegisterSuccess = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(RegisterSuccess);

const reflection = {
  component: ConnectedRegisterSuccess,
  layout: Sparse,
  layoutProps: {
    title: 'Evry Member Portal',
    subtitle: 'Account is registered!'
  },
  route: '/register-success'
};

export default RegisterSuccess;

export { reflection };
