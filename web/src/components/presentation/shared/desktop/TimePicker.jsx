import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import 'react-widgets/lib/scss/react-widgets.scss';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import defaultTheme from '../../../../style/themes';

const { DateWrapper, DateWrapperIcon } = defaultTheme.components;

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
      <DateWrapper styleType={styleType}>
        <DateTimePicker
          time
          date={false}
          open={pickerIsOpen}
          name={inputName}
          onClick={!pickerIsOpen ? this.handlers.openPicker : undefined}
          onFocus={this.handlers.openPicker}
          onBlur={this.handlers.closePicker}
          defaultValue={chosenTime}
          inputProps={{ onBlur: ev => ev.target.blur() }}
          onChange={value => this.handlers.handleChange(value, changeCallback)}
          max={maxDateChoice}
          value={chosenTime}
          placeholder={placeholder}
        />
        <DateWrapperIcon className="material-icons">access_time</DateWrapperIcon>
      </DateWrapper>
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
