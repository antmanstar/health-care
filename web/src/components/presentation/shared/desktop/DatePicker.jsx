import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import 'react-widgets/lib/scss/react-widgets.scss';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import defaultTheme from '../../../../style/themes';

const { DateWrapper, DateWrapperIcon } = defaultTheme.components;

class DatePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pickerIsOpen: false,
      chosenDate: props.chosenDate
    };

    this.handlers = {
      openPicker: this.openPicker.bind(this),
      handleChange: this.handleChange.bind(this),
      closePicker: this.closePicker.bind(this),
      setChosenDate: this.setChosenDate.bind(this)
    };
  }

  setChosenDate(value, callback) {
    if (callback) {
      this.setState(
        { chosenDate: value || new Date() },
        callback(Moment(value).format('MMM D, YYYY'))
      );
    } else {
      this.setState({ chosenDate: value || new Date() });
    }
  }

  handleChange(value, callback) {
    this.setChosenDate(value, callback);
    this.closePicker();
  }

  closePicker() {
    this.setState({ pickerIsOpen: false });
  }

  openPicker() {
    this.setState({ pickerIsOpen: 'date' });
  }

  render() {
    Moment.locale('en');
    momentLocalizer();

    const { pickerIsOpen, chosenDate } = this.state;
    const {
      inputName,
      styleType,
      placeholder,
      changeCallback,
      minDateChoice,
      maxDateChoice
    } = this.props;

    const min = minDateChoice ? new Date(minDateChoice) : new Date();
    const max = maxDateChoice ? new Date(maxDateChoice) : new Date('Dec 31, 2030');

    return (
      <DateWrapper styleType={styleType}>
        <DateTimePicker
          time={false}
          open={pickerIsOpen}
          format="MMM D, YYYY"
          messages={placeholder}
          name={inputName}
          onClick={!pickerIsOpen ? this.handlers.openPicker : undefined}
          onFocus={this.handlers.openPicker}
          onBlur={this.handlers.closePicker}
          defaultValue={chosenDate}
          inputProps={{ onBlur: ev => ev.target.blur() }}
          onChange={value => this.handlers.handleChange(value, changeCallback)}
          min={min}
          max={max}
          value={chosenDate}
          placeholder={placeholder}
        />
        <DateWrapperIcon className="material-icons">date_range</DateWrapperIcon>
      </DateWrapper>
    );
  }
}

DatePicker.propTypes = {
  inputName: PropTypes.string.isRequired,
  chosenDate: PropTypes.string,
  styleType: PropTypes.string,
  placeholder: PropTypes.string,
  changeCallback: PropTypes.func,
  minDateChoice: PropTypes.string,
  maxDateChoice: PropTypes.string
};
DatePicker.defaultProps = {
  chosenDate: null,
  styleType: 'standard',
  placeholder: 'Choose a date',
  changeCallback: null,
  minDateChoice: null,
  maxDateChoice: null
};

export default DatePicker;
