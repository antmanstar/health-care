import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Sparse } from '../layouts';
import OnboardingProgressBar from '../presentation/registration/desktop/OnboardingProgressBar';
import OnboardingSlide from '../presentation/registration/desktop/OnboardingSlide';
import OnboardingControls from '../presentation/registration/desktop/OnboardingControls';
import selectors from '@evry-member-app/shared/store/selectors';
import Interpolation from '../../utils/Interpolation';
import history from '../../utils/history';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import defaultTheme from '../../style/themes';
const { getMemberName, isOnboardingComplete, isAuthenticated } = selectors;

// Onboarding
const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin: auto auto 0;
  padding: 16px 0 0 0;
  box-sizing: border-box;
  overflow: hidden;
  padding-bottom: 5px;
  border-top: 1px solid ${props => props.theme.colors.shades.nearlyWhite};

  @media ${defaultTheme.device.tablet} {
    border-top: none;
  }
  @media ${defaultTheme.device.desktopXL} {
    max-width: 1024px;
  }
`;

const Onboarding = ({ isOnboardingComplete, isAuthenticated }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const maxSteps = 4;

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/sign-in');
    } else {
      if (isOnboardingComplete) {
        history.push('/');
      }
    }
  }, [isOnboardingComplete, isAuthenticated]);

  const handleStepBackward = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleStepForward = () => {
    if (currentStep === maxSteps) {
      history.push('/choose-a-care-plan');
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <Wrapper>
      <Helmet>
        <title>Onboarding - Evry Health</title>
      </Helmet>
      <OnboardingProgressBar progressStep={1} />
      <OnboardingSlide slide={currentStep} />
      <OnboardingControls
        currentStep={currentStep}
        maxSteps={maxSteps}
        handleNextFunction={handleStepForward}
        handlePrevFunction={handleStepBackward}
      />
    </Wrapper>
  );
};

Onboarding.propTypes = {
  isOnboardingComplete: PropTypes.bool
};

Onboarding.defaultProps = {
  isOnboardingComplete: false
};

const mapStateToProps = state => ({
  isOnboardingComplete: isOnboardingComplete(state),
  isAuthenticated: isAuthenticated(state)
});

const ConnectedOnboarding = connect(mapStateToProps)(Onboarding);

const reflection = {
  component: ConnectedOnboarding,
  layout: Sparse,
  layoutProps: {
    title: new Interpolation(['Hi ', state => String(getMemberName(state).first), "! We're Evry."]),
    subtitle: 'We do things a little different.',
    fullWidth: true
  },
  route: '/onboarding'
};

export default Onboarding;

export { reflection };
