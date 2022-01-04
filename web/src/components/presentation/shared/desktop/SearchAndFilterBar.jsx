import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FilterOptions from './FilterOptions';

// Small Search Bar with Date & Filter Buttons

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
    cursor: pointer;
  }

  input {
    width: 100%;
    background: none;
    color: ${props => props.theme.colors.shades.blue};
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
`;

class SearchAndFilterBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      showFilters: false
    };
  }

  handleClose = () => {
    this.setState({ showFilters: false });
  };

  render() {
    const { bordered, placeholder, dateButton, filterButton } = this.props;
    const { query, showFilters } = this.state;

    return (
      <>
        <Wrapper bordered={bordered}>
          <Search>
            <i
              className="material-icons"
              onClick={() => {
                const { search } = this.props;
                const { query } = this.state;
                search(query);
              }}
            >
              search
            </i>
            <input
              type="text"
              name="search"
              placeholder={placeholder}
              value={query}
              onChange={e => {
                this.setState({ query: e.target.value });
              }}
            />
          </Search>
          <FilterButtons>
            {dateButton && (
              <FilterButton
                bordered={bordered}
                onClick={() => this.setState({ showFilters: true })}
              >
                <i className="material-icons">date_range</i>
              </FilterButton>
            )}
            {filterButton && (
              <FilterButton
                bordered={bordered}
                onClick={() => this.setState({ showFilters: true })}
              >
                <i className="material-icons">filter_list</i>
              </FilterButton>
            )}
          </FilterButtons>
          {showFilters && <FilterOptions handleClose={this.handleClose} />}
        </Wrapper>
      </>
    );
  }
}

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

export default SearchAndFilterBar;
