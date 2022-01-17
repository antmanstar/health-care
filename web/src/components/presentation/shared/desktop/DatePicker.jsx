import React, { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import styled from 'styled-components';
import DatePicker from "react-datepicker";
import defaultTheme from '../../../../style/themes';

const { DateWrapper, DateWrapperIcon } = defaultTheme.components;

const DatePickerWrapper = styled.div`
  display: flex;
  position: relative;

  input {
    border: none;
    height: 50px;
  }

  i {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    color: #02324c;
  }
`;

const DateTimePicker = ({ inputName, styleType, placeholder, changeCallback, minDateChoice, maxDateChoice, chosenDate, clear }) => {
  //const [ startDate, setStartDate ] = useState(new Date());
  const [dateSelected, setDateSelected] = useState(chosenDate);

  useEffect(() => {
    setDateSelected(null)
  }, [clear])

  const setChosenDate = (value, callback) => {
    const chosenDate = value || new Date();
    if (callback) {
      callback(Moment(value).format('YYYY-MM-DD'), inputName)
    } else {
      setDateSelected(chosenDate)
    }
  }

  const handleChange = (value, callback) => {
    setChosenDate(value, callback);
  }

  return (
    <DatePickerWrapper>
      <DatePicker
        selected={dateSelected}
        onChange={(value) => {
          setDateSelected(value)
          handleChange(value, changeCallback)
        }}
        name={inputName}
        placeholderText={placeholder}
      />
      <DateWrapperIcon className="material-icons">date_range</DateWrapperIcon>
    </DatePickerWrapper>
  )
}

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
  maxDateChoice: null
};


export default DateTimePicker;
