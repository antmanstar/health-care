import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Provider Tag for Provider List Items in the "Provider Lookup" View

const Wrapper = styled.div`
  margin-right: 8px;
  padding: 4px 12px;
  font-size: 14px;
  color: ${props => props.theme.colors.shades.white};
  background: ${props =>
    props.specialty ? props.theme.colors.shades.pinkOrange : props.theme.colors.shades.blue};
`;

const ProviderTag = React.memo(({ specialty, text }) => (
  <Wrapper specialty={specialty}>{text}</Wrapper>
));

ProviderTag.propTypes = {
  specialty: PropTypes.bool,
  text: PropTypes.string.isRequired
};

ProviderTag.defaultProps = {
  specialty: false
};

export default ProviderTag;
