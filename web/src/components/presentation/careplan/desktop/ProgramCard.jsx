import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';

// Partnered Program Card for "Meet you goals" section on the "Care Plan" View.

const Wrapper = styled.div`
  width: 48%;
  border: 1px solid ${props => props.theme.colors.shades.nearlyWhite};
  border-radius: 6px;
`;

const Container = styled.div`
  padding: 16px;
`;

const TitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const Icon = styled.div`
  height: 32px;
  width: 32px;
  margin-right: 16px;
`;

const Title = styled.h1`
  margin: 0 auto 0 0;
  font-weight: 500;
  font-size: 20px;
  color: ${props => props.theme.colors.shades.blue};
`;

const Description = styled.p`
  margin: 0;
  font-weight: 300;
  font-size: 14px;
  color: ${props => props.theme.colors.shades.gray};
`;

const Button = styled.button`
  width: 100%;
  padding: 16px;
  font-weight: 300;
  font-size: 16px;
  border: none;
  border-radius: 0 0 6px 6px;
  background: ${props => props.color};
  color: ${props => props.theme.colors.shades.white};
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }

  &:focus {
    outline: none;
  }
`;

const ProgramCard = React.memo(({ icon, title, desc, actionText, onClick, color }) => (
  <Wrapper>
    <Container>
      <TitleSection>
        {icon && <Icon src={icon} color={color} />}
        <Title>{title}</Title>
      </TitleSection>
      <Description>{desc}</Description>
    </Container>
    <Button color={color} onClick={onClick}>
      {actionText}
    </Button>
  </Wrapper>
));

ProgramCard.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  actionText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string
};

ProgramCard.defaultProps = {
  icon: null,
  color: defaultTheme.gradients.main
};

export default ProgramCard;
