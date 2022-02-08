import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import ProgressDots from '../../shared/desktop/ProgressDots';
import useIsOverflow from '../../../../utils/useIsOverflow';
// Desktop Onboarding Controls

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-top: 32px;
  box-sizing: border-box;
  height: 100px;
  max-height: 100px;
  border-top: 1px solid ${props => props.theme.colors.shades.nearlyWhite};

  @media ${defaultTheme.device.tablet} {
    border-top: none;
    position: ${props => (props.isOverflow ? 'unset' : 'absolute')};
    bottom: 30px;
    left: 0;
  }

  @media ${defaultTheme.device.desktopXL} {
    border-top: none;
  }
`;

const ButtonWrapper = styled.div`
  min-width: 80px;
  display: flex;
  align-items: center;
`;

const ProgressWrapper = styled.div`
  width: 100vw;
  align-items: center;
`;

const SmallButton = styled.button`
  padding: 8px 32px;
  font-size: 14px;
  font-weight: 400;
  background: ${props => props.theme.colors.shades.blue};
  color: ${props => props.theme.colors.shades.white};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.shades.tealBlue};
  }

  &:focus {
    outline: none;
  }

  &: disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

const OnboardingControls = React.memo(
  ({
    handleNextFunction,
    handlePrevFunction,
    currentStep,
    maxSteps,
    isQuestionAnswered,
    isSavingQuestionnaire
  }) => {
    const isOverflow = useIsOverflow();

    return (
      <Wrapper isOverflow={isOverflow}>
        <ButtonWrapper>
          <SmallButton
            onClick={handleNextFunction}
            disabled={
              (isQuestionAnswered !== undefined ? !isQuestionAnswered : undefined) ||
              isSavingQuestionnaire
            }
            type="button"
          >
            NEXT
          </SmallButton>
        </ButtonWrapper>
        <ProgressWrapper>
          {/* <SectionDivider /> */}
          <ProgressDots currentStep={currentStep} maxSteps={maxSteps} />
        </ProgressWrapper>
      </Wrapper>
    );
  }
);

OnboardingControls.propTypes = {
  handleNextFunction: PropTypes.func.isRequired,
  handlePrevFunction: PropTypes.func.isRequired,
  maxSteps: PropTypes.number.isRequired,
  currentStep: PropTypes.number,
  isSavingQuestionnaire: PropTypes.bool
};

OnboardingControls.defaultProps = {
  currentStep: 1
};

export default OnboardingControls;
