import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Sparse } from '../layouts';
import defaultTheme from '../../style/themes';
import Button from '../presentation/shared/desktop/Button';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import StyledLoadingSpinner from '../presentation/shared/Loader/StyledLoadingSpinner';
import ErrorMessage from '../presentation/shared/desktop/ErrorMessage';
import history from '../../utils/history';
import { Divider } from '@material-ui/core';

const { verifyEligibilityIdAndSSN, initRegister } = actions;
const {
  getAuthError,
  isVerifiedRegisteringUser,
  isVerifyingElegibility,
  getVerifyMembershipError
} = selectors;

//  Registration Start View
// TODO: need to send Evry member id & last 4 of ssn to confirm membership to move to Create Account View

const { LayoutWrapper, Input, TwoColumnRow, SectionDivider } = defaultTheme.components;
const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: auto auto 0;
  padding: 16px 0 0 0;
  box-sizing: border-box;
  border-top: 1px solid ${props => props.theme.colors.shades.nearlyWhite};

  @media ${defaultTheme.device.tablet} {
    border-top: none;
  }

  @media ${defaultTheme.device.desktopXL} {
    border-top: none;
  }
`;
const FormWrapper = styled.div`
  width: 100%;
`;

const SmallContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 16px;
  @media ${props => props.theme.device.tablet} {
    width: 48%;
    margin-bottom: 0;
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
  padding: 32px 0;
  flex-wrap: wrap;
  margin-bottom: 0;

  @media ${props => props.theme.device.tabletXL} {
    flex-wrap: nowrap;
    margin-bottom: 16px;
  }
`;

const Label = styled.p`
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 400;
  color: ${props => props.theme.colors.shades.blue};
`;

const InputInstruction = styled.p`
  margin: 0 0 16px;
  font-size: 14px;
  font-weight: 300;
  color: ${props => props.theme.colors.shades.gray};
  max-width: 450px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 32px;
`;

const GoToSignIn = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  margin-top: 20px;
  flex-direction: column;
  text-align: center;
  align-items: center;

  @media ${props => props.theme.device.tabletXL} {
    flex-direction: row;
    align-items: baseline;
    font-size: 20px;
  }
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
const BottomSectionDivider = styled.div`
  padding: 16px 0;
  height: fit-content;
  width: 100%;
`;
const ErrorMessageWrapper = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;
const DividerWrapper = styled.div`
  @media ${props => props.theme.device.tabletXL} {
    display: none;
  }
`;
const BottomText = styled.p`
  @media ${props => props.theme.device.tabletXL} {
    font-size: 20px;
  }
`;

function Register({
  authError,
  isVerifiedRegisteringUser,
  isVerifyingElegibility,
  verifyMembershipError,
  verifyEligibilityIdAndSSN,
  initRegister
}) {
  const [memberId, setMemberId] = useState('');
  const [firstLoading, setFirstLoading] = useState(true);
  const [ssn, setSsn] = useState('');

  useEffect(() => {
    if (firstLoading) {
      setFirstLoading(false);
      initRegister();
    }

    if (isVerifiedRegisteringUser && !firstLoading) {
      history.push('/create-account');
    }
  }, [isVerifiedRegisteringUser, firstLoading]);
  const handleChangeMemberId = e => {
    setMemberId(e.target.value);
  };

  const handleChangeSSN = e => {
    const re = /^[0-9\b]+$/;

    if (e.target.value === '' || re.test(e.target.value)) {
      setSsn(e.target.value);
    }
  };

  const handleSubmit = () => {
    verifyEligibilityIdAndSSN({ eligibilityId: memberId, last4SSN: ssn });
  };

  const renderVerifyMembershipError = () => {
    let message =
      verifyMembershipError?.result !== undefined && !verifyMembershipError?.result
        ? ['Invalid combination of Member ID and social security number.']
        : verifyMembershipError?.error;
    if (message) {
      message = (
        <ErrorMessageWrapper>
          <ErrorMessage message={message} />
        </ErrorMessageWrapper>
      );
    }
    return message;
  };

  return (
    <Wrapper>
      <FormWrapper>
        <Title>Find your membership.</Title>
        <SectionDivider />
        <form autoComplete="false">
          <EditedTwoColumnRow>
            <SmallContainer>
              <Label htmlFor="memberId">Enter your Member ID.</Label>
              <InputInstruction>
                You can find your Member ID on your Membership Card or in your Evry Benefits
                Guidebook.
              </InputInstruction>
              <Input
                type="text"
                name="memberId"
                id="memberId"
                placeholder="Example: EVR19238400032"
                onChange={handleChangeMemberId}
              />
            </SmallContainer>
            <SmallContainer>
              <Label htmlFor="social">
                Enter the last 4 digits of your social security number.
              </Label>
              <InputInstruction>This is used to validate your Member ID.</InputInstruction>
              <Input
                className="push-down"
                type="password"
                name="ssn"
                id="ssn"
                maxLength={4}
                value={ssn}
                placeholder="****"
                onChange={handleChangeSSN}
              />
            </SmallContainer>
          </EditedTwoColumnRow>
          <SectionDivider />
          <ButtonWrapper>
            <Button
              buttonType="submit"
              value="Confirm Membership"
              text="Confirm Membership"
              onClick={handleSubmit}
              disabled={isVerifyingElegibility}
            />
          </ButtonWrapper>
        </form>
      </FormWrapper>
      {renderVerifyMembershipError()}
      <BottomSectionDivider>
        <DividerWrapper>
          <SectionDivider />
        </DividerWrapper>
        <GoToSignIn>
          <BottomText>Already have an account?</BottomText>
          <RouterLink to="/sign-in">Sign In</RouterLink>
        </GoToSignIn>
      </BottomSectionDivider>

      {isVerifyingElegibility && <StyledLoadingSpinner type="TailSpin" color="#00BFFF" />}
    </Wrapper>
  );
}

Register.propTypes = {
  isVerifyingElegibility: PropTypes.bool,
  isVerifiedRegisteringUser: PropTypes.bool,
  verifyEligibilityIdAndSSN: PropTypes.func
};

Register.defaultProps = {
  isVerifiedRegisteringUser: false,
  verifyEligibilityIdAndSSN: () => {}
};

const mapStateToProps = state => ({
  authError: getAuthError(state),
  isVerifiedRegisteringUser: isVerifiedRegisteringUser(state),
  isVerifyingElegibility: isVerifyingElegibility(state),
  verifyMembershipError: getVerifyMembershipError(state)
});

const mapDispatchToProps = dispatch => ({
  verifyEligibilityIdAndSSN: ({ eligibilityId, last4SSN }) => {
    dispatch(verifyEligibilityIdAndSSN({ eligibilityId, last4SSN }));
  },
  initRegister: () => {
    dispatch(initRegister());
  }
});

const ConnectedRegister = connect(mapStateToProps, mapDispatchToProps)(Register);

const reflection = {
  component: ConnectedRegister,
  layout: Sparse,
  layoutProps: {
    title: 'Register your account.',
    subtitle: 'Enter your details to confirm your Evry Membership and setup your online account.'
  },
  route: '/register'
};

export default Register;

export { reflection };
