import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';

// MOBILE - Information Item w/ Icon

const { MobileSectionBackground, MobileContainer } = defaultTheme.components;

const Container = styled(MobileContainer)`
  display: flex;
  align-items: center;
`;

const Icon = styled.i`
  margin-right: 16px;
  color: ${props => props.theme.colors.shades.blue};
`;

const Text = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 300;
  color: ${props => props.theme.colors.shades.blue};

  &.gray {
    color: ${props => props.theme.colors.shades.gray};
  }
`;

const InfoItemWithIcon = React.memo(({ icon, text }) => (
  <MobileSectionBackground>
    <Container>
      <Icon className="material-icons">{icon}</Icon>
      <Text className={text.includes('not provided') && 'gray'}>{text}</Text>
    </Container>
  </MobileSectionBackground>
));

InfoItemWithIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default InfoItemWithIcon;
