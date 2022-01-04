import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Sparse } from '../../layouts';
import OnboardingProgressBar from '../../presentation/registration/desktop/OnboardingProgressBar';
import OnboardingSlide from '../../presentation/registration/desktop/OnboardingSlide';
import OnboardingControls from '../../presentation/registration/desktop/OnboardingControls';
import selectors from '@evry-member-app/shared/store/selectors';
import Interpolation from '../../../utils/Interpolation';
import history from '../../../utils/history';
import { Helmet } from 'react-helmet-async';

const { getMemberName, isOnboardingComplete } = selectors;

// Onboarding

class Onboarding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      maxSteps: 4
    };
  }

  componentDidMount() {
    this.checkOnboardingStatus();
  }

  checkOnboardingStatus() {
    const { isOnboardingComplete } = this.props;
    if (isOnboardingComplete) {
      history.push('/');
    }
  }

  handleStepBackward = () => {
    const decrementStep = () => {
      const { currentStep } = this.state;
      return currentStep - 1;
    };
    this.setState({ currentStep: decrementStep() });
  };

  handleStepForward = () => {
    const { currentStep, maxSteps } = this.state;
    const incrementStep = () => currentStep + 1;

    if (currentStep === maxSteps) {
      history.push('/choose-a-care-plan');
    } else {
      this.setState({ currentStep: incrementStep() });
    }
  };

  render() {
    const { currentStep, maxSteps } = this.state;

    return (
      <>
        <Helmet>
          <title>Onboarding - Evry Health</title>
        </Helmet>
        <OnboardingProgressBar progressStep={1} />
        <OnboardingSlide slide={currentStep} />
        <OnboardingControls
          currentStep={currentStep}
          maxSteps={maxSteps}
          handleNextFunction={this.handleStepForward}
          handlePrevFunction={this.handleStepBackward}
        />
      </>
    );
  }
}

Onboarding.propTypes = {
  isOnboardingComplete: PropTypes.bool
};

Onboarding.defaultProps = {
  isOnboardingComplete: false
};

const mapStateToProps = state => ({
  isOnboardingComplete: isOnboardingComplete(state)
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

export default ConnectedOnboarding;

export { reflection };
