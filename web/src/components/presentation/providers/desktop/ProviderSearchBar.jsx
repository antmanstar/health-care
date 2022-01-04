import React from 'react';
import styled from 'styled-components';
import images from '../../../../utils/images';


// Provider Lookup Search Bar

const Wrapper = styled.div`
  height: 64px;
  max-width: 960px;
  width: 100%;
  padding: 0 0 0 24px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  outline: none;
  border: none;
  border-radius: 4px;
  margin: -32px auto 16px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  img {
    height: 24px;
    width: 24px;
    margin-right: 14px;
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

const FilterButtons = styled.div`
  display: flex;
  align-items: center;
`;

const FilterButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
  width: 64px;
  outline: none;
  border: none;
  border-left: 1px solid ${props => props.theme.colors.shades.nearlyWhite};

  &:last-child {
    border-radius: 0 4px 4px 0;
  }

  &:hover {
    cursor: pointer;
    background: ${props => props.theme.colors.shades.nearlyWhite};
  }
`;

const ProviderSearchBar = React.memo(() => (
  <Wrapper>
    <Search>
      <img src={images["search"]} alt="search icon" />
      <input type="text" name="search" placeholder="Search our provider network." />
    </Search>
    <FilterButtons>
      <FilterButton>
        <img src={images["location_pin"]} alt="filter by location" />
      </FilterButton>
      <FilterButton>
        <img src={images["filter"]} alt="filter results" />
      </FilterButton>
    </FilterButtons>
  </Wrapper>
));

export default ProviderSearchBar;
