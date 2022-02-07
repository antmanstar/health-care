import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Moment from 'moment';
import defaultTheme from '../../../../style/themes';
import DatePicker from './DatePicker';
import SmallButton from './SmallButton';
import { connect } from 'react-redux';
import selectors from '@evry-member-app/shared/store/selectors';

const { getNotificationsFilters } = selectors;

const { SpaceBetween, SectionDivider, Scrim } = defaultTheme.components;

const Wrapper = styled.div`
  position: absolute;
  top: calc(100% + 16px);
  right: 0;
  background: ${props => props.theme.colors.shades.white};
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  z-index: 100;
  left: 0;
  width: 100%;
  @media screen and (min-width: 500px) and (max-width: 1180px) {
    width: 350px;
    left: auto;
  }
`;

const TransparentScrim = styled(Scrim)`
  opacity: 0;
`;

const Header = styled.div`
  padding: 16px;
  background: ${props => props.theme.gradients.main};
  color: ${props => props.theme.colors.shades.white};
  border-radius: 4px 4px 0 0;
  text-transform: uppercase;
  font-weight: 400;

  button {
    outline: none;
    border: none;
    background: none;
    color: ${props => props.theme.colors.shades.white};
  }
`;

const Container = styled.div`
  padding: 16px;
`;

const EditedSpaceBetween = styled(SpaceBetween)`
  > *:first-child {
    margin-right: 8px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;

  button:last-child {
    margin-left: 8px;
  }
`;

const MessagesError = styled.p`
  margin: 0;
  font-size: 14px;
`;

const FilterOptions = ({
  handleClose,
  search,
  query,
  request,
  notificationsFilters,
  type,
  clearData
}) => {
  const { dateFrom, dateTo } = request;
  const [dateStart, setDateStart] = useState(dateFrom != undefined ? new Date(dateFrom) : '');
  const [dateEnd, setDateEnd] = useState(dateTo != undefined ? new Date(dateTo) : '');
  const [filterError, setFilterError] = useState({
    hasError: false,
    messageError: ''
  });
  const [clear, setClear] = useState(0);

  const handleClear = () => {
    setDateStart(null);
    setDateEnd(null);
    setClear(clear + 1);
    handleClose();
    search({ dateFrom: null, dateTo: null, query: query });
  };

  const handleDateChange = (value, type) => {
    if (type === 'date-start') {
      setDateStart(value);
    } else {
      setDateEnd(value);
    }
  };

  const handleFilter = () => {
    if (!dateStart.length) {
      setFilterError({ hasError: true, messageError: 'You need to choose the start date.' });
      return;
    }
    if (type === 'notifications') {
      clearData();
      let query = notificationsFilters?.query;
      search({
        dateFrom: dateStart,
        dateTo: dateEnd ? dateEnd : Moment(new Date()).format('YYYY-MM-DD'),
        query: query
      });
      handleClose();
    } else {
      search({
        dateFrom: dateStart,
        dateTo: dateEnd ? dateEnd : Moment(new Date()).format('YYYY-MM-DD'),
        query: query
      });
      handleClose();
    }
  };

  const { hasError, messageError } = filterError;
  return (
    <>
      <TransparentScrim onClick={() => handleClose()} />
      <Wrapper>
        <Header>
          <SpaceBetween>
            Filters
            <button type="button" onClick={() => handleClose()}>
              <i className="material-icons">close</i>
            </button>
          </SpaceBetween>
        </Header>
        <Container>
          <EditedSpaceBetween>
            <DatePicker
              placeholder="Choose Start Date"
              changeCallback={handleDateChange}
              inputName="date-start"
              clear={clear}
              chosenDate={dateStart}
            />
            <DatePicker
              placeholder="Choose End Date"
              changeCallback={handleDateChange}
              inputName="date-end"
              clear={clear}
              chosenDate={dateEnd}
            />
          </EditedSpaceBetween>
          {hasError && <MessagesError>{messageError}</MessagesError>}
        </Container>
        <SectionDivider />
        <Container>
          <ButtonWrapper>
            <SmallButton text="Apply Filters" onClick={() => handleFilter()} />
            <SmallButton text="Clear Filters" onClick={() => handleClear()} negative />
          </ButtonWrapper>
        </Container>
      </Wrapper>
    </>
  );
};

FilterOptions.propTypes = {
  handleClose: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  notificationsFilters: getNotificationsFilters(state)
});

const ConnectedFilterOptions = connect(mapStateToProps)(FilterOptions);

export default ConnectedFilterOptions;
