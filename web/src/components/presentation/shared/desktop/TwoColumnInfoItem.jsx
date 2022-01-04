import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// This is a single information item for the "Account Settings" view

const Wrapper = styled.div`
  display: flex;
  line-height: 22px;
  padding: 13px 0;
  font-size: 16px;
  font-weight: 300;
  justify-content: space-between;
  color: ${props => props.theme.colors.shades.darkGray};
  border-top: 1px solid ${props => props.theme.colors.shades.nearlyWhite};
  text-align: right;

  a {
    text-decoration: none;
    color: ${props => props.theme.colors.shades.pinkOrange};
    &:hover {
      text-decoration: underline;
    }
    &.no-link-style {
      color: ${props => props.theme.colors.shades.darkGray};
    }
  }
`;

const TwoColumnInfoItem = ({ children }) => <Wrapper>{children}</Wrapper>;

TwoColumnInfoItem.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

export default TwoColumnInfoItem;
