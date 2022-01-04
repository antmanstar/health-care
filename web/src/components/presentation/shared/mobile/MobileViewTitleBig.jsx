import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';

// MOBILE - Big Mobile View Title - For Care Plan View

const { MobileContainer } = defaultTheme.components;

const IconAndTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  color: ${props => props.theme.colors.shades.white};
`;

const Icon = styled.img`
  margin-right: 16px;
`;

const Title = styled.h1`
  margin: 0 0 4px;
  font-size: 24px;
  font-weight: 500;
  letter-spacing: 0.8px;
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 20px;
  font-weight: 300;
  color: ${props => props.theme.colors.shades.white};
`;

const Description = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 0.8;
  color: ${props => props.theme.colors.shades.white};
`;

const MobileViewTitleBig = React.memo(({ icon, title, subtitle, description }) => (
  <MobileContainer>
    <IconAndTitleWrapper>
      {icon && <Icon src={`/assets/white_icons/${icon}.svg`} />}
      <div>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </div>
    </IconAndTitleWrapper>
    <Description>{description}</Description>
  </MobileContainer>
));

MobileViewTitleBig.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default MobileViewTitleBig;
