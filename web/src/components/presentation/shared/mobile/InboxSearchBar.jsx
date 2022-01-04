import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import { CSSTransition } from 'react-transition-group';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import 'react-widgets/lib/scss/react-widgets.scss';
import defaultTheme from '../../../../style/themes';
import FilterOverlay from './FilterOverlay';
import MobileActionButton from './MobileActionButton';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';

const { saveInboxFilters } = actions;
const { getInboxFilters } = selectors;

const {
  MobileFixedBottomButton,
  DateWrapper,
  DateWrapperIcon,
  MobileModalListTitle
} = defaultTheme.components;

// Global Search bar in header of every view

const Search = styled.div`
  height: 48px;
  padding: 0;
  background: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  outline: none;
  border: none;
  border-radius: 4px;
  margin: 16px auto;
  box-sizing: border-box;
  display: flex;
  align-items: stretch;
  justify-content: flex-end;
  width: 100%;

  i {
    font-size: 24px;
    padding: 0 4px;
    text-align: center;
    flex-grow: 1;
    padding-top: 11px;
    color: ${props => props.theme.colors.shades.blue};
    &.clickable {
      border-left: solid 1px #eee;
      cursor: pointer;
    }
  }

  input {
    min-width: 60%;
    flex-grow: 4;
    background: none;
    color: ${props => props.theme.colors.shades.blue};
    caret-color: ${props => props.theme.colors.shades.pinkOrange};
    font-size: 16px;
    font-weight: 300;
    padding-top: 10px;
    padding-bottom: 10px;
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

const Title = styled.h2`
  font-size: 24px;
  font-weight: 500;
  margin: 0 0 4px;
  text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
  padding-top: 48px;
`;

const Subtitle = styled.span`
  display: block;
  font-size: 14px;
`;

const Divider = styled.div`
  padding: 12px 0;
  width: 100%;
  border-bottom: solid 1px ${props => props.theme.colors.shades.white};
`;

const DateFilter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 50px;

  .date-wrapper {
    width: 48%;
    &:first-child {
      .rw-popup-container {
        left: -6px;
      }
    }
    &:last-child {
      .rw-popup-container {
        left: auto;
      }
    }
  }
`;

const FilterActions = styled.div`
  text-align: center;
`;

const MobileFixedBottomButtonAdapted = styled(MobileFixedBottomButton)`
  border: none;
  box-sizing: border-box;
  margin-top: auto;
  width: 100%;
  position: relative;
  padding: 0;

  button {
    max-width: 420px;
    cursor: pointer;
    &.clear-filters {
      background: transparent;
      color: ${props => props.theme.colors.shades.white};
      border: 0;
      outline: 0;
      padding: 16px;
      font-size: 14px;
      font-weight: 500;
      margin: 8px 0 16px;
      text-transform: uppercase;
      box-sizing: border-box;
    }
  }
`;

const FilterWrapper = styled.div`
  .fade-enter {
    opacity: 0;
  }
  .fade-enter-active {
    opacity: 1;
    transition: all 150ms;
  }
  .fade-exit {
    opacity: 1;
  }
  .fade-exit-active {
    opacity: 0;
    transition: all 150ms;
  }
`;

class InboxSearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filtersOpen: false,
      startDateIsOpen: false,
      endDateIsOpen: false,
      startDate: props.startDate,
      endDate: props.endDate,
      maxStart: props.startDate || new Date(),
      minEnd: props.endDate || null
    };

    this.handlers = {
      openFilters: this.openFilters.bind(this),
      closeFilters: this.closeFilters.bind(this),
      openStartDate: this.openStartDate.bind(this),
      openEndDate: this.openEndDate.bind(this),
      handleStartChange: this.handleStartChange.bind(this),
      handleEndChange: this.handleEndChange.bind(this),
      closeStartDate: this.closeStartDate.bind(this),
      closeEndDate: this.closeEndDate.bind(this),
      setStartDate: this.setStartDate.bind(this),
      setEndDate: this.setEndDate.bind(this),
      handleSave: this.handleSave.bind(this),
      handleReset: this.handleReset.bind(this)
    };
  }

  componentDidMount() {
    const { filters } = this.props;

    if (filters !== null && filters.dates !== null && filters.dates instanceof Object) {
      if (filters.dates.from !== false && filters.dates.from !== null) {
        this.setStartDate(moment(filters.dates.from).toDate());
      }

      if (filters.dates.to !== false && filters.dates.to !== null) {
        this.setEndDate(moment(filters.dates.to).toDate());
      }
    }
  }

  setStartDate(value, callback) {
    this.setState({ startDate: value, minEnd: value || new Date() }, callback);
  }

  setEndDate(value, callback) {
    this.setState({ endDate: value, maxStart: value || new Date() }, callback);
  }

  setDates(start, end, callback) {
    this.setState(
      {
        startDate: start,
        minEnd: start || new Date(),
        endDate: end,
        maxStart: end || new Date()
      },
      callback
    );
  }

  handleStartChange(value) {
    this.setStartDate(value);
    this.closeStartDate();
  }

  handleEndChange(value) {
    this.setEndDate(value);
    this.closeEndDate();
  }

  closeEndDate() {
    this.setState({ endDateIsOpen: false });
  }

  openEndDate() {
    this.setState({ endDateIsOpen: 'date' });
  }

  closeStartDate() {
    this.setState({ startDateIsOpen: false });
  }

  openStartDate() {
    this.setState({ startDateIsOpen: 'date' });
  }

  openFilters() {
    this.setState({ filtersOpen: true });
  }

  closeFilters() {
    this.setState({ filtersOpen: false });
  }

  handleSave() {
    const { startDate, endDate } = this.state;
    const { saveInboxFilters } = this.props;
    saveInboxFilters(startDate && String(startDate), endDate && String(endDate));
    this.closeFilters();
  }

  handleReset() {
    this.setDates(null, null, () => {
      this.handleSave();
      this.closeFilters();
    });
  }

  render() {
    moment.locale('en');
    momentLocalizer();

    const {
      endDate,
      startDate,
      filtersOpen,
      startDateIsOpen,
      endDateIsOpen,
      maxStart,
      minEnd
    } = this.state;

    return (
      <>
        <Search>
          <i className="material-icons">search</i>
          <input type="text" name="search" placeholder="Search for anything." tabIndex="0" />
          <i
            role="button"
            className="material-icons clickable"
            onKeyDown={this.handlers.openFilters}
            onClick={this.handlers.openFilters}
            tabIndex="0" // Always set tabIndex to non positive
          >
            date_range
          </i>
        </Search>
        <FilterWrapper>
          <CSSTransition in={filtersOpen} classNames="fade" timeout={150} unmountOnExit>
            <FilterOverlay>
              <Title>Filter Notifications</Title>
              <Subtitle>Tap to change filters.</Subtitle>
              <Divider />
              <MobileModalListTitle>Date Range</MobileModalListTitle>
              <DateFilter>
                <DateWrapper className="date-wrapper" styleType="inverse">
                  <DateTimePicker
                    time={false}
                    open={startDateIsOpen}
                    format="MMM D, YYYY"
                    messsages="Please select a start date"
                    name="start_date"
                    onClick={!startDateIsOpen ? this.handlers.openStartDate : undefined}
                    onFocus={this.handlers.openStartDate}
                    onBlur={this.handlers.closeStartDate}
                    defaultValue={startDate}
                    inputProps={{ onBlur: ev => ev.target.blur() }}
                    onChange={value => this.handlers.handleStartChange(value)}
                    max={maxStart}
                    value={startDate}
                    placeholder="Start date"
                  />
                  <DateWrapperIcon className="material-icons">date_range</DateWrapperIcon>
                </DateWrapper>
                <DateWrapper className="date-wrapper" styleType="inverse">
                  <DateTimePicker
                    time={false}
                    open={endDateIsOpen}
                    format="MMM D, YYYY"
                    messsages="Please select an end date"
                    name="end_date"
                    onClick={!endDateIsOpen ? this.handlers.openEndDate : undefined}
                    onFocus={this.handlers.openEndDate}
                    onBlur={this.handlers.closeEndDate}
                    defaultValue={endDate}
                    inputProps={{ onBlur: ev => ev.target.blur() }}
                    onChange={value => this.handlers.handleEndChange(value)}
                    min={minEnd}
                    value={endDate}
                    placeholder="End date"
                  />
                  <DateWrapperIcon className="material-icons">date_range</DateWrapperIcon>
                </DateWrapper>
              </DateFilter>
              <MobileFixedBottomButtonAdapted>
                <FilterActions>
                  <MobileActionButton
                    text="Apply Filters"
                    type="inverse"
                    onClick={this.handlers.handleSave}
                  />
                  <button
                    type="button"
                    className="clear-filters"
                    onClick={this.handlers.handleReset}
                  >
                    Clear Filters
                  </button>
                </FilterActions>
              </MobileFixedBottomButtonAdapted>
            </FilterOverlay>
          </CSSTransition>
        </FilterWrapper>
      </>
    );
  }
}

InboxSearchBar.propTypes = {
  startDate: PropTypes.oneOf([PropTypes.instanceOf(Date), null]),
  endDate: PropTypes.oneOf([PropTypes.instanceOf(Date), null]),
  saveInboxFilters: PropTypes.func.isRequired,
  filters: PropTypes.shape({})
};

InboxSearchBar.defaultProps = {
  filters: {},
  startDate: null,
  endDate: null
};

const mapStateToProps = state => ({
  filters: getInboxFilters(state)
});

const mapDispatchToProps = dispatch => ({
  saveInboxFilters: (startDate, endDate) => {
    dispatch(saveInboxFilters(startDate, endDate));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InboxSearchBar);
