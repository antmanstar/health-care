import React from 'react';
import styled from 'styled-components';

// Search Suggestions for "Provider Lookup" and other full view searches

const Wrapper = styled.div`
  margin-top: 64px;
  text-align: center;
  color: ${props => props.theme.colors.shades.gray};

  > * {
    margin: 0;
  }

  p {
    margin-bottom: 8px;
    font-weight: 400;
  }

  svg {
    height: 64px;
    width: 64px;
  }
`;

const Suggestions = styled.div`
  font-style: italic;
`;

const SearchSuggestions = React.memo(() => (
  <Wrapper>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path
        fill="#D2D2D2"
        d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
      />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
    <p>Try searching by ...</p>
    <Suggestions>Name, Location, Specialty, or Language</Suggestions>
  </Wrapper>
));

export default SearchSuggestions;
