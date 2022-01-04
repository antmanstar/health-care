import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import Select from '../../shared/desktop/Select';
import SmallButton from '../../shared/desktop/SmallButton';
import DatePicker from '../../shared/desktop/DatePicker';
import TimePicker from '../../shared/desktop/TimePicker';

// MODAL - Schedule an Appointment

const {
  Scrim,
  ModalBody,
  ModalButtonsRight,
  ModalHalfColumn,
  ModalHeader,
  ModalSectionDivider,
  ModalTitle,
  ModalWrapper,
  SpaceBetween
} = defaultTheme.components;

const SqaushedSpaceBetween = styled(SpaceBetween)`
  margin-bottom: -8px;
`;

class ScheduleAppointmentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      member: '',
      provider: '',
      date: null,
      time: null
    };

    this.handlers = {
      handleChange: this.handleChange.bind(this),
      handleDateChange: this.handleDateChange.bind(this),
      handleTimeChange: this.handleTimeChange.bind(this)
    };
  }

  handleChange(event) {
    const stateObject = {};
    stateObject[event.target.name] = event.target.value;
    this.setState(stateObject);
  }

  handleDateChange(value) {
    this.setState({ date: value });
  }

  handleTimeChange(value) {
    this.setState({ time: value });
  }

  render() {
    const { member, provider, date, time } = this.state;
    const { dependents, hideModal } = this.props;
    return (
      <>
        <Scrim onClick={hideModal} />
        <ModalWrapper className="narrow">
          <ModalHeader>
            <ModalTitle>Schedule an Appointment</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Select
              name="member"
              placeholder="Who is this appointment for?"
              icon="arrow"
              value={member}
              onChange={this.handlers.handleChange}
            >
              {dependents &&
                dependents.map(dependent => (
                  <option>{`${dependent.first} ${dependent.last}`}</option>
                ))}
            </Select>
            <Select
              name="provider"
              placeholder="Choose a provider."
              icon="arrow"
              value={provider}
              onChange={this.handlers.handleChange}
            >
              <option>Provider 1</option>
              <option>Provider 2</option>
              <option>Provider 3</option>
            </Select>
            <SqaushedSpaceBetween>
              <ModalHalfColumn>
                <DatePicker
                  inputName="date"
                  chosenDate={date}
                  changeCallback={this.handlers.handleDateChange}
                />
              </ModalHalfColumn>
              <ModalHalfColumn>
                <TimePicker
                  inputName="time"
                  chosenDate={time}
                  changeCallback={this.handlers.handleTimeChange}
                />
              </ModalHalfColumn>
            </SqaushedSpaceBetween>
          </ModalBody>
          <ModalSectionDivider />
          <ModalButtonsRight>
            <SmallButton text="Submit Request" />
            <SmallButton text="Cancel" negative onClick={hideModal} />
          </ModalButtonsRight>
        </ModalWrapper>
      </>
    );
  }
}

ScheduleAppointmentModal.propTypes = {
  dependents: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  hideModal: PropTypes.func.isRequired
};

export default ScheduleAppointmentModal;
