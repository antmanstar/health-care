import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 0 auto;
  padding-top: 95px;
  width: 100%;
  color: ${props => props.theme.colors.shades.white};
`;

const Title = styled.h1`
  margin: 0 0 8px;
  font-size: 25px;
  font-weight: 700;

  @media ${props => props.theme.device.desktop} {
    font-size: 40px;
  }
`;

const Subtitle = styled.h3`
  margin: 0;
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 0.4px;

  @media ${props => props.theme.device.desktop} {
    font-size: 18px;
  }
`;

const ViewTitleAndSubtitle = ({ title, subtitle }) => (
  <Wrapper>
    <Title>{title}</Title>
    {subtitle !== undefined && <Subtitle>{subtitle}</Subtitle>}
  </Wrapper>
);

ViewTitleAndSubtitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string
};

ViewTitleAndSubtitle.defaultProps = {
  subtitle: undefined
};

export default ViewTitleAndSubtitle;
