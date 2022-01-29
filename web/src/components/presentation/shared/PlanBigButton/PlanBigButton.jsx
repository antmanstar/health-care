import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import images from '../../../../utils/images';
// Big Button w/ Icon - Used in "ActionButtons" and modals

const Button = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
  padding: 19px 16px;
  background: ${props =>
    props.isComing ? props.theme.colors.shades.darkGray : props.theme.colors.shades.tealBlue};
  color: ${props => props.theme.colors.shades.white};
  border: none;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  font-weight: 300;
  font-size: 14px;
  outline: none;

  &:hover {
    background: #1c4c66;
  }

  @media ${props => props.theme.device.desktop} {
    font-size: 16px;
    padding: 19px 32px;
  }

  pointer-events: ${props => (props.isComing ? 'none' : 'auto')};
  cursor: ${props => (props.isComing ? 'not-allowed' : 'pointer')};
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ComingText = styled.div`
  font-size: 12px;
`;

const Icon = styled.i`
  color: ${props => props.theme.colors.shades.white};
`;

const SvgIcon = styled.img`
  height: auto;
`;

const PlanBigButton = React.memo(({ text, icon, onClick, svgIcon }) => {
  const isComing = text === 'Update Health Survey';

  return (
    <Button onClick={onClick} className="plan-big-button" isComing={isComing}>
      <StyledDiv>
        {text}
        {isComing && <ComingText>Coming soon...</ComingText>}
      </StyledDiv>
      {svgIcon ? <SvgIcon src={images[icon]} /> : <Icon className="material-icons">{icon}</Icon>}
    </Button>
  );
});

PlanBigButton.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  svgIcon: PropTypes.bool
};

PlanBigButton.defaultProps = {
  onClick: null,
  svgIcon: true
};

export default PlanBigButton;
