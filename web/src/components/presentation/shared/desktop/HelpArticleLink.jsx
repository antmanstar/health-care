import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// This is a help article link button for desktop

const Wrapper = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background: ${props => props.theme.colors.shades.nearlyWhite};
  color: ${props => props.theme.colors.shades.darkGray};
  text-decoration: none;
  border-radius: 4px;
  &:hover {
    background: #ececec;
    cursor: pointer;
  }
`;

const LeftGroup = styled.div`
  display: flex;
  align-items: center;

  i {
    margin-right: 16px;
  }
`;

const HelpArticleLink = React.memo(({ text, url }) => (
  <Wrapper href={url}>
    <LeftGroup>
      <i className="material-icons">info_outline</i>
      <p>{text}</p>
    </LeftGroup>
    <i className="material-icons info-arrow">keyboard_arrow_right</i>
  </Wrapper>
));

HelpArticleLink.propTypes = {
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default HelpArticleLink;
