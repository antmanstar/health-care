import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import SmallButton from '../../shared/desktop/SmallButton';
import SupportProfile from '../../shared/desktop/SupportProfile';
import DatePicker from '../../shared/desktop/DatePicker';
import TimePicker from '../../shared/desktop/TimePicker';

// MODAL - Meet Care Guide

const {
  FormLabel,
  Input,
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

class MeetCareGuideModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
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
    const { phoneNumber, date, time } = this.state;
    const { hideModal } = this.props;
    return (
      <>
        <Scrim onClick={hideModal} />
        <ModalWrapper className="extra-narrow">
          <ModalHeader>
            <ModalTitle>Meet Your Care Guide.</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <SupportProfile
              name="Nicole Stevens"
              roleLabel="Care Guide"
              number="(555) 857-5309"
              email="nstevens@evryhealth.com"
              imgSrc="https://randomuser.me/api/portraits/lego/3.jpg"
            />
            <ModalSectionDivider />
            <FormLabel>Schedule a Phone Call</FormLabel>
            <Input
              name="phoneNumber"
              placeholder="Enter a phone number"
              icon="arrow"
              value={phoneNumber}
              onChange={this.handlers.handleChange}
            />
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

MeetCareGuideModal.propTypes = {
  hideModal: PropTypes.func.isRequired
};

export default MeetCareGuideModal;
