import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// This is a single information item for the "Account Settings" view

const Wrapper = styled.div`
  line-height: 48px;
  font-size: 16px;
  font-weight: 300;
  color: ${props => props.theme.colors.shades.darkGray};
  border-top: 1px solid ${props => props.theme.colors.shades.nearlyWhite};
`;

const InfoItem = ({ text }) => <Wrapper>{text}</Wrapper>;

InfoItem.propTypes = {
  text: PropTypes.string.isRequired
};

export default InfoItem;
