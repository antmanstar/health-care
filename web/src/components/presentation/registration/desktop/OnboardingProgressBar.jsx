import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';

// Progress Steps for onboarding / registration

const OuterWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.colors.shades.nearlyWhite};
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  margin: auto;
  width: 100%;

  @media ${defaultTheme.device.desktop} {
    max-width: 960px;
  }

  @media ${defaultTheme.device.desktopXL} {
    max-width: 1024px;
  }
`;

const OnboardingCell = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 228px;
  padding: 8px 0;
  overflow: hidden;
  background: ${props => props.theme.colors.shades.nearlyWhite};
  color: ${props => props.theme.colors.shades.blue};

  @media ${defaultTheme.device.desktopXL} {
    width: 256px;
  }
`;

const BackgroundFill = styled.div`
  background: ${props => props.theme.gradients.main};
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  transform: ${props => (props.completed ? 'translateX(0)' : 'translateX(-100%)')};
  transition: all 300ms cubic-bezier(0.895, 0.03, 0.685, 0.22);
`;

const Label = styled.div`
  z-index: 1;
  transition: all 300ms cubic-bezier(0.895, 0.03, 0.685, 0.22);
  color: ${props =>
    props.completed ? props.theme.colors.shades.white : props.theme.colors.shades.blue};
`;

const OnboardingCellStart = styled(OnboardingCell)`
  clip-path: polygon(0% 0%, 96% 0%, 100% 50%, 96% 100%, 0% 100%);
`;

const OnboardingCellMiddle = styled(OnboardingCell)`
  clip-path: polygon(96% 0%, 100% 50%, 96% 100%, 0% 100%, 4% 50%, 0% 0%);
`;

const OnboardingCellEnd = styled(OnboardingCell)`
  clip-path: polygon(100% 0, 100% 50%, 100% 100%, 0% 100%, 4% 50%, 0% 0%);
`;

const OnboardingProgressBar = ({ progressStep }) => (
  <OuterWrapper>
    <InnerWrapper>
      <OnboardingCellStart>
        <BackgroundFill completed={progressStep >= 1 && true} />
        <Label completed={progressStep >= 1 && true}>Onboarding</Label>
      </OnboardingCellStart>
      <OnboardingCellMiddle>
        <BackgroundFill completed={progressStep >= 2 && true} />
        <Label completed={progressStep >= 2 && true}>Choose a Care Plan</Label>
      </OnboardingCellMiddle>
      <OnboardingCellMiddle>
        <BackgroundFill completed={progressStep >= 3 && true} />
        <Label completed={progressStep >= 3 && true}>Questionnaire</Label>
      </OnboardingCellMiddle>
      <OnboardingCellEnd>
        <BackgroundFill completed={progressStep >= 4 && true} />
        <Label completed={progressStep >= 4 && true}>Complete Registration</Label>
      </OnboardingCellEnd>
    </InnerWrapper>
  </OuterWrapper>
);

OnboardingProgressBar.propTypes = {
  progressStep: PropTypes.number
};

OnboardingProgressBar.defaultProps = {
  progressStep: 1
};

export default OnboardingProgressBar;
