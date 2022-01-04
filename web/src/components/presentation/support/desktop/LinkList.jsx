import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// List of Links used in the "SupportArticlesSection" of the "Customer Support" View

const Wrapper = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 1.5em;

  li {
    line-height: 20px;
    margin-bottom: 8px;
    a {
      font-weight: 300;
      color: ${props => props.theme.colors.shades.pinkOrange};
      &:hover {
        opacity: 0.7;
      }
    }
    @media ${props => props.theme.device.desktop} {
      line-height: 24px;
    }
  }
`;

const LinkList = ({ children }) => <Wrapper>{children}</Wrapper>;

LinkList.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

export default LinkList;
