import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import SmallButton from '../../shared/desktop/SmallButton';
import { PopOver } from '../../shared/desktop/PopOver';
import { useRef } from 'react';

// Provider Lookup Search Bar

const {
  providerSearchQuery,
  geoLocationSearch,
  setNewCurrentLocation,
  findAvailableSpecialities
} = actions;
const { getLocationData, getProviderSearchQueryLocation, getToken } = selectors;

const Wrapper = styled.div`
  height: 64px;
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

  i {
    margin-right: 14px;
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

const ErrorLabel = styled.label`
  display: block;
  text-align: center;
  color: red;
  padding: 0px 10px 0px 10px;
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
    padding: 0 16px 0 16px;
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

    &:invalid {
      border: 2px red;
      background-color: #ffa4aa;
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

const AutoCompleteWrapper = styled.div`
  background-color: white;
  z-index: 100000000;
  width: 100%;
  display: block;
  position: absolute;
  top: 63px;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const AutoCompleteItem = styled.div`
  padding: 8px;
  color: black;
  cursor: pointer;
  list-style-type: none;
  font-size: 1.1em;

  &:hover {
    background-color: blue;
    color: white;
  }
`;

const ProviderSearchBar = React.memo(
  ({
    providerSearchQuery,
    token,
    geoLocationSearch,
    setNewCurrentLocation,
    searchLocationError,
    findAvailableSpecialities,
    specialityList
  }) => {
    const [query, setQuery] = useState('');
    const [searchAddress, setSearchAddress] = useState({ state: '', city: '', zip: '' });
    const [filterModal, setFilterModal] = useState(false);
    const [filterError, setFilterError] = useState('');
    const [showAutoComplete, setShowAutoComplete] = useState(true);
    const autoCompleteList = useRef([]);

    useEffect(() => {
      findAvailableSpecialities(token);
    }, []);

    const RenderAutoComplete = React.memo(({ value }) => {
      if (!showAutoComplete && autoCompleteList.current.length === 0) {
        setShowAutoComplete(false);
      } else setShowAutoComplete(true);

      autoCompleteList.current = specialityList.filter(speciality =>
        speciality.value.toUpperCase().includes(value.toUpperCase())
      );

      let listToRender = null;

      const handleAutoCompleteClick = speciality => {
        setQuery(speciality);
        autoCompleteList.current.length = 0;
        setShowAutoComplete(false);
        search({ search: query });
      };

      autoCompleteList.current.length > 0 && showAutoComplete
        ? (listToRender = (
            <AutoCompleteWrapper>
              {autoCompleteList.current.map(speciality => (
                <AutoCompleteItem onClick={() => handleAutoCompleteClick(speciality.value)}>
                  {speciality.value}
                </AutoCompleteItem>
              ))}
            </AutoCompleteWrapper>
          ))
        : (listToRender = null);
      return listToRender;
    });

    const handleKeyDown = e => {
      if (e.key === 'Enter') {
        setQuery(e.target.value);
        search({ search: query });
      }
    };

    const search = args => {
      providerSearchQuery({ query: args });
    };

    const getNavError = error => {
      setNewCurrentLocation({ error: error.message, filter: true });
    };

    const getCurrentLocation = () => {
      setNewCurrentLocation({ isLoading: true, filter: true });
      window.navigator.geolocation.getCurrentPosition(setCurrentLocation, error =>
        getNavError(error)
      );
    };

    const setCurrentLocation = position => {
      setNewCurrentLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        filter: true,
        isLoading: false
      });
    };

    const getLocation = () => {
      if (window.navigator.geolocation) {
        getCurrentLocation();
      }
    };

    const handleFilterSubmit = () => {
      let request = {
        city: searchAddress.city,
        state: searchAddress.state,
        zip: searchAddress.zip
      };
      if (
        (searchAddress.zip && searchAddress.city) ||
        (searchAddress.city && searchAddress.state) ||
        searchAddress.zip.length === 5
      ) {
        setFilterError('');
        geoLocationSearch({ ...request, token });
        waitForError();
      } else setFilterError('Choose a City & State, City & Zip or Zip');
    };

    return (
      <div style={{ position: 'relative' }}>
        <Wrapper>
          <Search>
            <i className="material-icons">search</i>
            <input
              type="text"
              name="search"
              placeholder="Search Provider, Practice Name, or Specialty."
              maxlength="100"
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
            <PopOver content={'Filter providers'} top="-30px" right={'2px'}>
              <FilterButton onClick={() => setFilterModal(!filterModal)}>
                <i className="material-icons">filter_list</i>
              </FilterButton>
            </PopOver>
          </FilterButtons>
        </Wrapper>
        {query.length > 3 && <RenderAutoComplete value={query} />}
        {filterModal ? (
          <FilterWrapper onMouseLeave={() => setFilterModal(false)}>
            <FilterTitle>FILTERS</FilterTitle>
            <FilterContainer>
              <FilterSearch>
                <input
                  type="text"
                  name="search"
                  placeholder={'City'}
                  pattern="[a-zA-Z]+"
                  value={searchAddress.city}
                  onChange={e => {
                    setSearchAddress({ ...searchAddress, city: e.target.value });
                  }}
                  autocomplete="off"
                />
                <input
                  type="text"
                  name="search"
                  placeholder={'State'}
                  pattern="[a-zA-Z]+"
                  value={searchAddress.state}
                  onChange={e => {
                    setSearchAddress({ ...searchAddress, state: e.target.value });
                  }}
                  autocomplete="off"
                />
              </FilterSearch>
              <FilterSearch>
                <input
                  type="text"
                  name="search"
                  placeholder={'Zip'}
                  minlength="5"
                  maxlength="5"
                  pattern="[0-9]+"
                  value={searchAddress.zip}
                  onChange={e => {
                    setSearchAddress({ ...searchAddress, zip: e.target.value });
                  }}
                  autocomplete="off"
                />
              </FilterSearch>
            </FilterContainer>
            {searchLocationError && filterError === '' ? (
              <ErrorLabel>Problem searching area.</ErrorLabel>
            ) : (
              <ErrorLabel>{filterError}</ErrorLabel>
            )}
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
  }
);

const mapStateToProps = state => ({
  locationData: getLocationData(state),
  token: getToken(state),
  searchLocationError: getProviderSearchQueryLocation(state)?.error,
  specialityList: state?.app?.availableSpecialities
});

const mapDispatchToProps = dispatch => ({
  providerSearchQuery: args => {
    dispatch(providerSearchQuery(args));
  },
  geoLocationSearch: args => {
    dispatch(geoLocationSearch(args));
  },
  setNewCurrentLocation: args => {
    dispatch(setNewCurrentLocation(args));
  },
  findAvailableSpecialities: token => {
    dispatch(findAvailableSpecialities(token));
  }
});

const ConnectedProviderSearchBar = connect(mapStateToProps, mapDispatchToProps)(ProviderSearchBar);

export default ConnectedProviderSearchBar;
