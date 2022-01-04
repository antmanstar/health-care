import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Title and Subtitle for Header during registration / onboarding

const Wrapper = styled.div`
  margin: auto;
  padding-top: 95px;
  width: 960px;
  color: ${props => props.theme.colors.shades.white};
`;

const Title = styled.h1`
  margin: 0 0 8px 0;
  font-size: 48px;
  font-weight: 900;
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 20px;
  font-weight: 300;
`;

const TitleAndSubtitle = React.memo(({ title, subtitle }) => (
  <Wrapper>
    <Title>{title}</Title>
    <Subtitle>{subtitle}</Subtitle>
  </Wrapper>
));

TitleAndSubtitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
};

export default TitleAndSubtitle;
