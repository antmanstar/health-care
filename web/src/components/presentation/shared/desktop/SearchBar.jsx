import React from 'react';
import styled from 'styled-components';

// Global Search bar in header of every view

const Search = styled.div`
  height: 64px;
  padding: 0 24px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  outline: none;
  border: none;
  border-radius: 4px;
  margin: -32px auto 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 10;
  i {
    margin-right: 20px;
    font-size: 24px;
    color: ${props => props.theme.colors.shades.blue};
  }

  input {
    width: 100%;
    background: none;
    color: ${props => props.theme.colors.shades.blue};
    caret-color: ${props => props.theme.colors.shades.pinkOrange};
    font-size: 16px;
    font-weight: 300;
    border: none;

    ::placeholder {
      color: ${props => props.theme.colors.shades.gray};
    }

    &:focus {
      outline: none;
      box-shadow: none;
    }
  }
`;

const SearchBar = React.memo(() => (
  <Search>
    <i className="material-icons">search</i>
    <input type="text" name="search" placeholder="Search for anything." autoComplete="off" />
  </Search>
));

export default SearchBar;
