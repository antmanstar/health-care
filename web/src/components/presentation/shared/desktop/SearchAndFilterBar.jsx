import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FilterOptions from './FilterOptions';
import { connect } from 'react-redux';
import selectors from '@evry-member-app/shared/store/selectors';
import { useEffect } from 'react';

// Small Search Bar with Date & Filter Buttons

const { getNotificationsFilters } = selectors;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  width: 100%;
  padding: 0 0 0 16px;
  background: white;
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
    color: #959595;
    font-family: 'Roboto';
    caret-color: ${props => props.theme.colors.shades.pinkOrange};
    font-size: 16px;
    font-weight: 300;
    line-height: 48px;
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
  height: 46px;
  width: 46px;
  background: ${props => props.theme.colors.shades.white};
  color: ${props => props.theme.colors.shades.blue};
  outline: none;
  border: none;
  border-left: 1px solid
    ${props =>
      props.bordered
        ? props.theme.colors.shades.mediumGray
        : props.theme.colors.shades.nearlyWhite};

  &:last-child {
    border-radius: 0 4px 4px 0;
  }

  &:hover {
    background: ${props => props.theme.colors.shades.nearlyWhite};
    cursor: pointer;
  }
  .calendar-red {
    color: #f9423a;
  }
`;

const ValidationMessage = styled.span`
  font-family: 'Roboto';
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  color: #4a4a4b;
`;

const SearchAndFilterBar = ({
  bordered,
  placeholder,
  dateButton,
  filterButton,
  search,
  request,
  clearData,
  notificationsFilters,
  noValidation,
  type
}) => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  const handleClose = () => {
    setShowFilters(false);
  };
  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      setQuery(e.target.value);
      if (type === 'notifications') {
        clearData();
        let dateFrom = notificationsFilters?.dateFrom;
        let dateTo = notificationsFilters?.dateTo;
        search({ dateFrom: dateFrom, dateTo: dateTo, query: query });
      } else if (type === 'myDocuments') {
        let dateFrom = notificationsFilters?.dateFrom;
        let dateTo = notificationsFilters?.dateTo;
        search({ dateFrom: dateFrom, dateTo: dateTo, query: query });
      } else {
        if (!showValidation) {
          search({ query: query });
        }
      }
    }
  };

  return (
    <>
      <Wrapper bordered={bordered}>
        <Search>
          <i className="material-icons">search</i>
          <input
            type="text"
            name="search"
            placeholder={placeholder}
            value={query}
            onChange={e => {
              const { value } = e.target;
              setQuery(value);
              if (value.length >= 3 || noValidation) {
                setShowValidation(false);
              } else {
                setShowValidation(true);
              }
            }}
            onKeyDown={e => handleKeyDown(e)}
          />
        </Search>
        <FilterButtons>
          {dateButton && (
            <FilterButton bordered={bordered} onClick={() => setShowFilters(true)}>
              <i
                className={`
                material-icons 
                ${request?.dateFrom && request?.dateTo ? 'calendar-red' : ''}
                ${showFilters ? 'calendar-red' : ''}`}
              >
                date_range
              </i>
            </FilterButton>
          )}
          {filterButton && (
            <FilterButton bordered={bordered} onClick={() => setShowFilters(true)}>
              <i className="material-icons">filter_list</i>
            </FilterButton>
          )}
        </FilterButtons>
        {showFilters && (
          <FilterOptions
            handleClose={handleClose}
            request={request || {}}
            search={search}
            query={query}
            clearData={clearData}
            type={type}
          />
        )}
      </Wrapper>
      {!noValidation && showValidation && (
        <ValidationMessage>Please type at least 3 characters to search</ValidationMessage>
      )}
    </>
  );
};

SearchAndFilterBar.propTypes = {
  placeholder: PropTypes.string.isRequired,
  bordered: PropTypes.bool,
  bigShadow: PropTypes.bool,
  search: PropTypes.func,
  dateButton: PropTypes.bool,
  filterButton: PropTypes.bool
};

SearchAndFilterBar.defaultProps = {
  bordered: false,
  bigShadow: false,
  search: () => {},
  dateButton: false,
  filterButton: false
};

const mapStateToProps = state => ({
  notificationsFilters: getNotificationsFilters(state)
});

const ConnectedSearchAndFilterBar = connect(mapStateToProps)(SearchAndFilterBar);

export default ConnectedSearchAndFilterBar;
