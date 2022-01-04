import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Title and Subtitle pair for section headings (no icon version)

const Title = styled.h2`
  margin: 0 0 4px 0;
  font-weight: 700;
  font-size: 18px;
  color: ${props => props.theme.colors.shades.blue};

  @media ${props => props.theme.device.tablet} {
    font-size: 24px;
    margin-bottom: 8px;
  }
`;

const Subtitle = styled.p`
  margin: 0;
  font-weight: 300;
  font-size: 14px;
  color: ${props => props.theme.colors.shades.darkGray};

  @media ${props => props.theme.device.tablet} {
    font-size: 16px;
  }
`;

const SectionHeader = React.memo(({ title, subTitle }) => (
  <>
    <Title>{title}</Title>
    <Subtitle>{subTitle}</Subtitle>
  </>
));

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string
};

SectionHeader.defaultProps = {
  subTitle: ''
};

export default SectionHeader;
