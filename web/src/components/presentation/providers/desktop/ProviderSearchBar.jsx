import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import SmallButton from '../../shared/desktop/SmallButton';
import { PopOver } from '../../shared/desktop/PopOver';

// Provider Lookup Search Bar

const { providerSearchQuery, geoLocationSearch } = actions;
const { getLocationData, getToken } = selectors;

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

const FilterWrapper = styled.div`
  z-index: 100;
  position: absolute;
  right: 0;
  width: 300px;
  height: 240px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  background-color: white;
`;
const FilterTitle = styled.div`
  padding: 15px;
  font-size: 18px;
  font-weight: 400;
  color: ${props => props.theme.colors.shades.blue};
  background: #f4f4f4;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;
`;

const FilterSearch = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  gap: 10px;
  width: 100%;
  form {
    display: flex;
    align-items: center;
    width: 100%;
  }
  input {
    color: ${props => props.theme.colors.shades.blue};
    caret-color: ${props => props.theme.colors.shades.pinkOrange};
    font-size: 16px;
    font-weight: 300;
    line-height: 48px;
    height: 48px;
    width: 100%;
    padding: 0 0 0 16px;
    background: #f4f4f4;
    outline: none;
    border: 1px solid
      ${props => (props.bordered ? props.theme.colors.shades.mediumGray : 'transparent')};
    border-radius: 4px;
    box-sizing: border-box;
    box-shadow: ${props =>
      (props.bordered === true && 'none') ||
      (props.bigShadow === true && '0 5px 15px rgba(0, 0, 0, 0.15)') ||
      '0 2px 4px rgba(0, 0, 0, 0.15)'};
    z-index: 10;

    ::placeholder {
      color: ${props => props.theme.colors.shades.gray};
    }

    &:focus {
      outline: none;
      box-shadow: none;
    }
  }
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  padding: 10px;

  button:last-child {
    margin-left: 8px;
  }
`;

const ProviderSearchBar = React.memo(({ providerSearchQuery, token, geoLocationSearch }) => {
  const [query, setQuery] = useState('');
  const [searchAddress, setSearchAddress] = useState({ state: '', city: '', zip: '' });
  const [filterModal, setFilterModal] = useState(false);

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      setQuery(e.target.value);
      search({ search: query });
    }
  };

  const search = args => {
    providerSearchQuery({ query: args });
  };

  const setCurrentLocation = position => {
    providerSearchQuery({
      location: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    });
  };

  const getLocation = () => {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(setCurrentLocation, console.log);
    }
  };

  const handleFilterSubmit = () => {
    let request = {
      city: searchAddress.city,
      state: searchAddress.state,
      zip: searchAddress.zip
    };
    geoLocationSearch({ ...request, token });
  };

  return (
    <div>
      <Wrapper>
        <Search>
          <input
            type="text"
            name="search"
            placeholder="Search our provider network."
            value={query}
            onChange={e => {
              setQuery(e.target.value);
            }}
            onKeyDown={e => handleKeyDown(e)}
          />
        </Search>
        <FilterButtons>
          <PopOver content={'Navigate to current location'} top="-30px">
            <FilterButton onClick={() => getLocation()}>
              <i className="material-icons">navigation</i>
            </FilterButton>
          </PopOver>
          <PopOver content={'Filter providers'} top="-30px">
            <FilterButton onClick={() => setFilterModal(!filterModal)}>
              <i className="material-icons">filter_list</i>
            </FilterButton>
          </PopOver>
        </FilterButtons>
      </Wrapper>
      {filterModal ? (
        <FilterWrapper>
          <FilterTitle>FILTERS</FilterTitle>
          <FilterContainer>
            <FilterSearch>
              <input
                type="text"
                name="search"
                placeholder={'City'}
                value={searchAddress.city}
                onChange={e => {
                  setSearchAddress({ ...searchAddress, city: e.target.value });
                }}
              />
              <input
                type="text"
                name="search"
                placeholder={'State'}
                value={searchAddress.state}
                onChange={e => {
                  setSearchAddress({ ...searchAddress, state: e.target.value });
                }}
              />
            </FilterSearch>
            <FilterSearch>
              <input
                type="text"
                name="search"
                placeholder={'Zip'}
                value={searchAddress.zip}
                onChange={e => {
                  setSearchAddress({ ...searchAddress, zip: e.target.value });
                }}
              />
            </FilterSearch>
          </FilterContainer>
          <ButtonWrapper>
            <SmallButton text="Apply Filters" onClick={() => handleFilterSubmit()} />
            <SmallButton
              text="Clear Filters"
              onClick={() => setSearchAddress({ state: '', city: '', zip: '' })}
              negative
            />
          </ButtonWrapper>
        </FilterWrapper>
      ) : (
        <></>
      )}
    </div>
  );
});

const mapStateToProps = state => ({
  locationData: getLocationData(state),
  token: getToken(state)
});

const mapDispatchToProps = dispatch => ({
  providerSearchQuery: args => {
    dispatch(providerSearchQuery(args));
  },
  geoLocationSearch: args => {
    dispatch(geoLocationSearch(args));
  }
});

const ConnectedProviderSearchBar = connect(mapStateToProps, mapDispatchToProps)(ProviderSearchBar);

export default ConnectedProviderSearchBar;
