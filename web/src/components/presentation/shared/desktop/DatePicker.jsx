import React, { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import defaultTheme from '../../../../style/themes';

const { DateWrapper, DateWrapperIcon } = defaultTheme.components;

const DatePickerWrapper = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 8px;

  input {
    border: none;
    height: 50px;
  }

  & input.date-picker-input {
    border: none;
    height: 50px;
    width: 100%;
    padding-left: 16px;
    background-color: #f4f4f4;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 400;
    color: #00263a;
    font-family: 'Roboto';
    box-sizing: border-box;
  }

  & i {
    position: absolute;
    right: 5%;
    top: 50%;
    transform: translateY(-50%);
    color: #02324c;
  }
`;

const MiddleManWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

const DateTimePicker = ({
  inputName,
  styleType,
  placeholder,
  changeCallback,
  minDateChoice,
  maxDateChoice,
  chosenDate,
  clear,
  filterDate,
  showTimeSelect,
  includeTimes,
  useCustomInput
}) => {
  //const [ startDate, setStartDate ] = useState(new Date());
  const [dateSelected, setDateSelected] = useState(chosenDate);

  const ExampleCustomInput = forwardRef(
    (
      //props,
      { value, onClick, placeholder, onBlur, onChange, onFocus, onKeyDown, className, name },
      ref
    ) => {
      //console.log(props);
      return (
        <>
          <input
            onClick={onClick}
            ref={ref}
            placeholder={placeholder}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            className={className}
            name={name}
          />
        </>
        // <CustomInput onClick={onClick} ref={ref} placeholder={placeholder}>
        //   {value}
        //   <DateWrapperIcon className="material-icons">date_range</DateWrapperIcon>
        // </CustomInput>
      );
    }
  );

  useEffect(() => {
    setDateSelected(null);
  }, [clear]);

  const setChosenDate = (value, callback) => {
    const chosenDate = value || new Date();
    const outputFormat = showTimeSelect ? 'YYYY-MM-DDTHH:mm:ss' : 'YYYY-MM-DD';
    if (callback) {
      callback(Moment(value).format(outputFormat), inputName);
    } else {
      setDateSelected(chosenDate);
    }
  };

  const handleChange = (value, callback) => {
    setChosenDate(value, callback);
  };
  const excludeSaturdays = date => {
    const day = date.getDay();
    return day !== 6;
  };
  return (
    <DatePickerWrapper>
      <DatePicker
        selected={dateSelected}
        onChange={value => {
          setDateSelected(value);
          handleChange(value, changeCallback);
        }}
        name={inputName}
        placeholderText={placeholder}
        filterDate={filterDate}
        minDate={minDateChoice}
        maxDate={maxDateChoice}
        showTimeSelect={showTimeSelect}
        timeFormat="hh:mm aa"
        dateFormat={showTimeSelect ? 'M/dd/yyyy hh:mm aa' : 'MM/dd/yyyy'}
        includeTimes={includeTimes}
        customInput={<ExampleCustomInput className="date-picker-input" />}
      />
      <DateWrapperIcon className="material-icons">date_range</DateWrapperIcon>
    </DatePickerWrapper>
  );
};

DateTimePicker.propTypes = {
  inputName: PropTypes.string.isRequired,
  chosenDate: PropTypes.string,
  styleType: PropTypes.string,
  placeholder: PropTypes.string,
  changeCallback: PropTypes.func,
  minDateChoice: PropTypes.string,
  maxDateChoice: PropTypes.string
};
DateTimePicker.defaultProps = {
  chosenDate: null,
  styleType: 'standard',
  placeholder: 'Choose a date',
  changeCallback: null,
  minDateChoice: null,
  maxDateChoice: null,
  showTimeSelect: null
};

export default DateTimePicker;
