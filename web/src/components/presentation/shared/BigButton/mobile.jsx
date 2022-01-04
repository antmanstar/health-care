import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';

// MOBILE - Big Mobile Button w/ Icon & Subtitle

const { MobileSectionBackground } = defaultTheme.components;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 16px;
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  height: 40px;
  width: 40px;

  i {
    color: ${props => props.theme.colors.shades.pinkOrange};
  }

  img {
    max-height: 40px;
    max-width: 40px;
  }
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.theme.colors.shades.blue};
  margin: 0 0 4px;
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 13px;
  font-weight: 400;
  color: ${props => props.theme.colors.shades.gray};
`;

const MobileBigButton = React.memo(({ title, subtitle, svgIcon, icon }) => (
  <MobileSectionBackground>
    <Container>
      <LeftSide>
        {icon && (
          <Icon>
            {svgIcon ? (
              <img src={`/assets/${icon}.svg`} alt="" />
            ) : (
              <i className="material-icons">{icon}</i>
            )}
          </Icon>
        )}
        <div>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </div>
      </LeftSide>
      <i className="material-icons">keyboard_arrow_right</i>
    </Container>
  </MobileSectionBackground>
));

MobileBigButton.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  icon: PropTypes.string,
  svgIcon: PropTypes.bool
};

MobileBigButton.defaultProps = {
  icon: null,
  svgIcon: false
};

export default MobileBigButton;
