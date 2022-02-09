import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// These are notes that go after sections, when a link or something needs to be provided.

const Note = styled.p`
  margin: 0;
  font-size: 10px;
  font-weight: 300;
  text-align: center;
  color: ${props => props.theme.colors.shades.gray};
  @media screen and (min-width: 800px) {
    text-align: left;
    font-size: 16px;
    margin-right: 15px;
  }
`;

const Link = styled.a`
  margin: 0 2px 0 6px;
  color: ${props => props.theme.colors.shades.pinkOrange};
  cursor: pointer;
  font-size: 10px;

  @media screen and (min-width: 800px) {
    font-size: 16px;
  }

  &:hover {
    opacity: 0.7;
    text-decoration: underline;
  }
`;

const PostSectionNote = ({ text, linkText, linkUrl, handleClick }) => (
  <Note>
    {text}
    {handleClick ? (
      <Link onClick={handleClick}>{linkText}</Link>
    ) : (
      <Link href={linkUrl}>{linkText}</Link>
    )}
    {`.`}
  </Note>
);

PostSectionNote.propTypes = {
  text: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  linkUrl: PropTypes.string,
  handleClick: PropTypes.func
};

PostSectionNote.defaultProps = {
  linkUrl: null,
  handleClick: null
};

export default PostSectionNote;
