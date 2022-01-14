import React, { Component } from 'react';
import styled from 'styled-components';
import { Mobile } from '../../layouts';
import defaultTheme from '../../../style/themes';
import OnboardingSlide from '../../presentation/registration/desktop/OnboardingSlide';
import OnboardingControls from '../../presentation/registration/desktop/OnboardingControls';
import history from '../../../utils/history';

// MOBILE: Onboarding

const { TrimmedHeader } = defaultTheme.components;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${props => props.theme.colors.shades.white};
  z-index: 0;
`;

const PositionedTrimmedHeader = styled(TrimmedHeader)`
  position: absolute;
  left: 0;
  top: 0;
`;

class Onboarding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      maxSteps: 4
    };
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
      history.push('/');
    } else {
      this.setState({ currentStep: incrementStep() });
    }
  };

  render() {
    const { currentStep, maxSteps } = this.state;

    return (
      <>
        <FlexColumn>
          <PositionedTrimmedHeader className="long" />
          <OnboardingSlide slide={currentStep} />
          <OnboardingControls
            currentStep={currentStep}
            maxSteps={maxSteps}
            handleNextFunction={this.handleStepForward}
            handlePrevFunction={this.handleStepBackward}
          />
        </FlexColumn>
      </>
    );
  }
}

const reflection = {
  component: Onboarding,
  layout: Mobile,
  layoutProps: {
    titleWrapperClass: 'none'
  },
  route: '/change-plan'
};

export default Onboarding;

export { reflection };
