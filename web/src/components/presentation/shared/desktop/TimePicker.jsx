import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import 'react-widgets/lib/scss/react-widgets.scss';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
//import TimePickerWidget from 'react-widgets/lib/TimePicker';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import Select from './Select';
const { DateWrapper, DateWrapperIcon } = defaultTheme.components;

const TimePickerWrapper = styled.div`
  display: flex;
  position: relative;

  input {
    border: none;
    height: 50px;
  }

  i {
    position: absolute;
    right: 5%;
    top: 40%;
    transform: translateY(-50%);
    color: #02324c;
  }
`;
const SelectWrapper = styled.div`
  width: 100%;
`;

class TimePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pickerIsOpen: false,
      chosenTime: props.chosenTime
    };

    this.handlers = {
      openPicker: this.openPicker.bind(this),
      handleChange: this.handleChange.bind(this),
      closePicker: this.closePicker.bind(this),
      setChosenTime: this.setChosenTime.bind(this)
    };
  }

  setChosenTime(value, callback) {
    if (callback) {
      this.setState({ chosenTime: value }, callback(Moment(value).format('HH:mm')));
    } else {
      this.setState({ chosenTime: value });
    }
  }

  handleChange(value, callback) {
    this.setChosenTime(value, callback);
    this.closePicker();
  }

  openPicker() {
    this.setState({ pickerIsOpen: 'time' });
  }

  closePicker() {
    this.setState({ pickerIsOpen: false });
  }

  render() {
    Moment.locale('en');
    momentLocalizer();

    const { pickerIsOpen, chosenTime, maxDateChoice } = this.state;
    const { inputName, styleType, placeholder, changeCallback } = this.props;

    return (
      // <DateWrapper styleType={styleType}>
      //   {/* <DateTimePicker
      //     time
      //     date={false}
      //     open={pickerIsOpen}
      //     name={inputName}
      //     onClick={!pickerIsOpen ? this.handlers.openPicker : undefined}
      //     onFocus={this.handlers.openPicker}
      //     onBlur={this.handlers.closePicker}
      //     defaultValue={chosenTime}
      //     inputProps={{ onBlur: ev => ev.target.blur() }}
      //     onChange={value => this.handlers.handleChange(value, changeCallback)}
      //     max={maxDateChoice}
      //     value={chosenTime}
      //     placeholder={placeholder}
      //   /> */}
      // </DateWrapper>
      <TimePickerWrapper>
        <SelectWrapper>
          <Select
            name={inputName}
            placeholder={placeholder}
            value={chosenTime}
            onChange={value => this.handlers.handleChange(value, changeCallback)}
            icon={null}
          >
            <option value="08:00:00">8:00AM</option>
            <option value="08:30:00">8:30AM</option>
            <option value="09:00:00">9:00AM</option>
            <option value="09:30:00">9:30AM</option>
            <option value="10:00:00">10:00AM</option>
            <option value="10:30:00">10:30AM</option>
            <option value="11:00:00">11:00AM</option>
            <option value="11:30:00">11:30AM</option>
            <option value="12:00:00">12:00PM</option>
            <option value="12:30:00">12:30PM</option>
            <option value="13:00:00">1:00PM</option>
            <option value="13:30:00">1:30PM</option>
            <option value="14:00:00">2:00PM</option>
            <option value="14:30:00">2:30PM</option>
            <option value="15:00:00">3:00PM</option>
            <option value="15:30:00">3:30PM</option>
            <option value="16:00:00">4:00PM</option>
            <option value="16:30:00">4:30PM</option>
            <option value="17:00:00">5:00PM</option>
          </Select>
        </SelectWrapper>
        <DateWrapperIcon className="material-icons">access_time</DateWrapperIcon>
      </TimePickerWrapper>
    );
  }
}

TimePicker.propTypes = {
  inputName: PropTypes.string.isRequired,
  chosenTime: PropTypes.string,
  styleType: PropTypes.string,
  placeholder: PropTypes.string,
  changeCallback: PropTypes.func
};

TimePicker.defaultProps = {
  chosenTime: null,
  styleType: 'standard',
  placeholder: 'Choose a time',
  changeCallback: null
};

export default TimePicker;
