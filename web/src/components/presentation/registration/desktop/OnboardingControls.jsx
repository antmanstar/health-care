import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import ProgressDots from '../../shared/desktop/ProgressDots';

// Desktop Onboarding Controls

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 960px;
  margin: auto auto 0;
  padding: 16px;
  box-sizing: border-box;
  border-top: 1px solid ${props => props.theme.colors.shades.nearlyWhite};

  @media ${defaultTheme.device.tablet} {
    border-top: none;
  }

  @media ${defaultTheme.device.desktopXL} {
    max-width: 1024px;
  }
`;

const ButtonWrapper = styled.div`
  min-width: 80px;
  display: flex;
  align-items: center;

  &:first-child {
    justify-content: flex-start;
    margin-right: auto;
  }

  &:last-child {
    justify-content: flex-end;
    margin-left: auto;
  }
`;

const SmallButton = styled.button`
  padding: 8px 16px;
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
`;

const OnboardingControls = React.memo(
  ({ handleNextFunction, handlePrevFunction, currentStep, maxSteps, isQuestionAnswered }) => (
    <Wrapper>
      <ButtonWrapper>
        {currentStep > 1 && (
          <SmallButton onClick={handlePrevFunction} type="button">
            PREV
          </SmallButton>
        )}
      </ButtonWrapper>
      <ProgressDots currentStep={currentStep} maxSteps={maxSteps} />
      <ButtonWrapper>
        <SmallButton onClick={handleNextFunction} disabled={isQuestionAnswered !== undefined ? !isQuestionAnswered : undefined} type="button">
          NEXT
        </SmallButton>
      </ButtonWrapper>
    </Wrapper>
  )
);

OnboardingControls.propTypes = {
  handleNextFunction: PropTypes.func.isRequired,
  handlePrevFunction: PropTypes.func.isRequired,
  maxSteps: PropTypes.number.isRequired,
  currentStep: PropTypes.number
};

OnboardingControls.defaultProps = {
  currentStep: 1
};

export default OnboardingControls;
