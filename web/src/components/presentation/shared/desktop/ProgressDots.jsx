import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Dots for showing steps in onboarding controls

const InnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;

const Dot = styled.div`
  height: 8px;
  width: 8px;
  margin: 0 10px;
  border-radius: 50%;
  background: ${props => (props.active ? props.theme.colors.shades.pinkRed : '#bbbcbc')};
  transform: ${props => (props.active ? 'scale(2)' : 'scale(1)')};
`;

const ProgressDots = React.memo(({ currentStep, maxSteps }) => {
  const makeDots = max => {
    const items = [];
    for (let i = 1; i <= max; i += 1) {
      items.push(<Dot active={currentStep === i} />);
    }
    return items;
  };

  const items = makeDots(maxSteps);

  return <InnerWrapper>{items}</InnerWrapper>;
});

ProgressDots.propTypes = {
  currentStep: PropTypes.number.isRequired,
  maxSteps: PropTypes.number.isRequired
};

export default ProgressDots;
