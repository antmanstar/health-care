import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import SmallButton from '../../shared/desktop/SmallButton';
import DatePicker from '../../shared/desktop/DatePicker';
import TimePicker from '../../shared/desktop/TimePicker';

// MODAL - Schedule a Phone Call

const {
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

class SchedulePhoneCallModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notice: props.modalData
        ? (props.modalData.claimNumber && `Regarding Claim # ${props.modalData.claimNumber}`) ||
          (props.modalData.requestNumber &&
            `Regarding Support Request # ${props.modalData.requestNumber}`)
        : null,
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
    const { notice, phoneNumber, date, time } = this.state;
    const { hideModal } = this.props;
    return (
      <>
        <Scrim onClick={hideModal} />
        <ModalWrapper className="extra-narrow">
          <ModalHeader>
            <ModalTitle>Schedule a Phone Call</ModalTitle>
          </ModalHeader>
          <ModalBody>
            {notice && <p>{notice}</p>}
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

SchedulePhoneCallModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  modalData: PropTypes.shape({
    claimNumber: PropTypes.string,
    requestNumber: PropTypes.string
  })
};

SchedulePhoneCallModal.defaultProps = {
  modalData: null
};

export default SchedulePhoneCallModal;
