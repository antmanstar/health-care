import React, { Component } from 'react';
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

const { verifyEligibilityIdAndSSN } = actions;
const { getAuthError, isVerifiedRegisteringUser, isVerifyingElegibility, getVerifyMembershipError } = selectors;

//  Registration Start View
// TODO: need to send Evry member id & last 4 of ssn to confirm membership to move to Create Account View

const { LayoutWrapper, Input, TwoColumnRow, SectionDivider } = defaultTheme.components;

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

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      memberId: '',
      ssn: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit() {
    const { verifyEligibilityIdAndSSN } = this.props;
    const { memberId: eligibilityId, ssn: last4SSN } = this.state;
    verifyEligibilityIdAndSSN({ eligibilityId, last4SSN });
  }

  renderVerifyMembershipError() {
    const { verifyMembershipError } = this.props;
    const message = (verifyMembershipError?.result !== undefined && !verifyMembershipError?.result) ? "An error occured, Please try again." : verifyMembershipError?.error;
    if (message) {
      return <ErrorMessage message={message} />;
    }
    return null;
  }

  render() {
    const { isVerifiedRegisteringUser, isVerifyingElegibility } = this.props;

    if (isVerifiedRegisteringUser) {
      return <Redirect to="/create-account" />;
    }

    return (
      <LayoutWrapper>
        <Title>Find your membership.</Title>
        <SectionDivider />
        <form autoComplete="false">
          <EditedTwoColumnRow>
            <SmallContainer>
              <Label htmlFor="memberId">Enter your Member ID.</Label>
              <InputInstruction>
                You can find you Member ID on your Membership Card or in your Evry Benefits
                Guidebook.
              </InputInstruction>
              <Input
                type="text"
                name="memberId"
                id="memberId"
                placeholder="Example: EVR19238400032"
                onChange={this.handleChange}
              />
            </SmallContainer>
            <SmallContainer>
              <Label htmlFor="social">Confirm your membership.</Label>
              <InputInstruction>
                Enter the last 4 digits of your social security number.
              </InputInstruction>
              <Input
                className="push-down"
                type="password"
                name="ssn"
                id="ssn"
                placeholder="****"
                onChange={this.handleChange}
              />
            </SmallContainer>
          </EditedTwoColumnRow>
          {this.renderVerifyMembershipError()}
          <SectionDivider />
          <ButtonWrapper>
            <Button
              type="submit"
              value="Confirm Membership"
              text="Confirm Membership"
              onClick={this.handleSubmit}
            />
          </ButtonWrapper>
        </form>
        <GoToSignIn>
          <p>Already have an account?</p>
          <RouterLink to="/sign-in">Sign In</RouterLink>
        </GoToSignIn>
        {
          isVerifyingElegibility && <StyledLoadingSpinner type="TailSpin" color = "#00BFFF" />
        }
      </LayoutWrapper>
    );
  }
}

Register.propTypes = {
  isVerifyingElegibility: PropTypes.bool,
  isVerifiedRegisteringUser: PropTypes.bool,
  verifyEligibilityIdAndSSN: PropTypes.func
};

Register.defaultProps = {
  isVerifiedRegisteringUser: false,
  verifyEligibilityIdAndSSN: () => { }
};

const mapStateToProps = state => ({
  authError: getAuthError(state),
  isVerifiedRegisteringUser: isVerifiedRegisteringUser(state),
  isVerifyingElegibility: isVerifyingElegibility(state),
  verifyMembershipError: getVerifyMembershipError(state),
});

const mapDispatchToProps = dispatch => ({
  verifyEligibilityIdAndSSN: ({ eligibilityId, last4SSN }) => {
    dispatch(verifyEligibilityIdAndSSN({ eligibilityId, last4SSN }));
  }
});

const ConnectedRegister = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

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
