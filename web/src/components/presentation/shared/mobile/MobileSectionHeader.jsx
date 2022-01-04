import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// MOBILE - Section Header - Title & Subtitle are optional

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.theme.colors.shades.blue};
  margin: ${props => (props.subtitle === undefined ? '24px 0 16px' : '24px 0 4px')};
`;

const Subtitle = styled.p`
  margin: ${props => (props.title === undefined ? '24px 0 16px' : '0px 0 16px')};
  font-size: 13px;
  font-weight: 400;
  color: ${props => props.theme.colors.shades.gray};
`;

const MobileSectionHeader = React.memo(({ title, subtitle }) => (
  <>
    {title !== undefined && <Title subtitle={subtitle}>{title}</Title>}
    {subtitle !== undefined && <Subtitle title={title}>{subtitle}</Subtitle>}
  </>
));

MobileSectionHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
};

MobileSectionHeader.defaultProps = {
  title: undefined,
  subtitle: undefined
};

export default MobileSectionHeader;
