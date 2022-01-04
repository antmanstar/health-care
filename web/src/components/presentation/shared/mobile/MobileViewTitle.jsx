import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';

// MOBILE - Mobile View Title w/ Optional Icon & Subtitle

const { MobileContainer } = defaultTheme.components;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${props => (props.subtitle !== undefined ? '8px' : '16px')};
  color: ${props => props.theme.colors.shades.white};
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  height: 40px;

  i {
    color: ${props => props.theme.colors.shades.white};
  }

  img {
    max-height: 40px;
    max-width: 40px;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 500;
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 300;
  color: ${props => props.theme.colors.shades.white};
`;

const MobileViewTitle = React.memo(({ icon, title, subtitle, svgIcon }) => (
  <MobileContainer>
    <TitleWrapper subtitle={subtitle}>
      {icon && (
        <Icon>
          {svgIcon ? (
            <img src={`/assets/white_icons/${icon}.svg`} alt="" />
          ) : (
            <i className="material-icons">{icon}</i>
          )}
        </Icon>
      )}
      <Title subtitle={subtitle}>{title}</Title>
    </TitleWrapper>
    {subtitle !== undefined && <Subtitle>{subtitle}</Subtitle>}
  </MobileContainer>
));

MobileViewTitle.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  subtitle: PropTypes.string,
  svgIcon: PropTypes.bool
};

MobileViewTitle.defaultProps = {
  icon: undefined,
  subtitle: undefined,
  svgIcon: false
};

export default MobileViewTitle;
