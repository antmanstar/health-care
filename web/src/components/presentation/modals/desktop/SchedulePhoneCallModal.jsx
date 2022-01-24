import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import SmallButton from '../../shared/desktop/SmallButton';
import DatePicker from '../../shared/desktop/DatePicker';
import TimePicker from '../../shared/desktop/TimePicker';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import Select from '../../shared/desktop/Select';
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

const {
  createSchedulePhoneCallCase,
  schedulePhoneCallReset,
  completeScheduledPhoneCallCase
} = actions;
const { getToken, getScheduledPhoneCallCase } = selectors;

const SqaushedSpaceBetween = styled(SpaceBetween)`
  margin-bottom: -8px;
`;
const FormError = styled.div`
  margin-top: 8px;
  color: ${props => props.theme.colors.shades.pinkOrange};
`;

const Column = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const includeTimes = [
  new Date().setHours(8, 0, 0),
  new Date().setHours(8, 30, 0),
  new Date().setHours(9, 0, 0),
  new Date().setHours(9, 30, 0),
  new Date().setHours(10, 0, 0),
  new Date().setHours(10, 30, 0),
  new Date().setHours(11, 0, 0),
  new Date().setHours(11, 30, 0),
  new Date().setHours(12, 0, 0),
  new Date().setHours(12, 30, 0),
  new Date().setHours(13, 0, 0),
  new Date().setHours(13, 30, 0),
  new Date().setHours(14, 0, 0),
  new Date().setHours(14, 30, 0),
  new Date().setHours(15, 0, 0),
  new Date().setHours(15, 30, 0),
  new Date().setHours(16, 0, 0),
  new Date().setHours(16, 30, 0),
  new Date().setHours(17, 0, 0)
];

class SchedulePhoneCallModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notice: props.modalData
        ? (props.modalData.claimNumber && `Regarding Claim # ${props.modalData.claimNumber}`) ||
          (props.modalData.requestNumber &&
            `Regarding Support Request # ${props.modalData.requestNumber}`)
        : null,
      reason: '',
      phoneNumber: '',
      date: null,
      time: null,
      dateTime: null,
      errorMessages: null
    };

    this.handlers = {
      handleChange: this.handleChange.bind(this),
      handleDateChange: this.handleDateChange.bind(this),
      handleTimeChange: this.handleTimeChange.bind(this),
      handleSubmit: this.handleSubmit.bind(this),
      handleDateTimeChange: this.handleDateTimeChange.bind(this),
      filterDate: this.filterDate.bind(this)
    };
  }

  componentDidMount() {
    this.props.resetSchedulePhoneCall();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.scheduledPhoneCallCase &&
      prevProps.scheduledPhoneCallCase.status === null &&
      this.props.scheduledPhoneCallCase.status === 'OPEN'
    ) {
      this.props.completeScheduledPhoneCallCase(
        this.props.scheduledPhoneCallCase.id,
        this.props.token
      );
    }
    if (
      prevProps.scheduledPhoneCallCase &&
      prevProps.scheduledPhoneCallCase.status === 'OPEN' &&
      this.props.scheduledPhoneCallCase.status === 'COMPLETE'
    ) {
      this.props.hideModal();
    }
  }

  handleChange(event) {
    const stateObject = {};
    stateObject[event.target.name] = event.target.value;
    this.setState(stateObject);
  }

  handleDateChange(value) {
    this.setState({ date: value });
  }
  handleDateTimeChange(value) {
    console.log(value);
    this.setState({ dateTime: value });
  }
  handleTimeChange(value) {
    this.setState({ time: value });
  }

  filterDate(date) {
    const day = date.getDay();
    return day !== 6;
  }

  handleSubmit(event) {
    event.preventDefault();
    const { reason, phoneNumber, date, time } = event.target.elements;
    let errors = [];
    if (reason.value.trim().length === 0) {
      errors.push('*There must be a reason.');
    }
    if (phoneNumber.value.trim().length === 0) {
      errors.push('*Phone number can not be blank');
    }
    if (date.value.trim().length === 0) {
      errors.push('*Date can not be blank.');
    }
    if (time.value.trim().length === 0) {
      errors.push('*Time can not be blank.');
    }

    if (errors.length > 0) {
      this.setState({ errorMessages: errors });
      return;
    }
    this.props.createCase(event, this.props.token);
    //this.props.hideModal();
  }

  render() {
    const { notice, reason, phoneNumber, date, time, dateTime } = this.state;
    const { hideModal, accountInfo } = this.props;
    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    let phoneNumberInput = (
      <Input
        name="phoneNumber"
        placeholder="What phone number should we call?"
        value={phoneNumber}
        onChange={this.handlers.handleChange}
      />
    );
    if (accountInfo.phones && accountInfo.phones.length > 0) {
      phoneNumberInput = (
        <Select
          name="phoneNumber"
          placeholder="What phone number should we call?"
          icon="arrow"
          value={phoneNumber}
          onChange={this.handlers.handleChange}
        >
          {accountInfo.phones.map(phone => (
            <option key={phone.phone_number} value={phone.phone_number}>
              {phone.phone_number}
            </option>
          ))}
        </Select>
      );
    }

    return (
      <>
        <Scrim onClick={hideModal} />
        <ModalWrapper className="extra-narrow">
          <ModalHeader>
            <ModalTitle>Schedule a Phone Call</ModalTitle>
          </ModalHeader>
          <form onSubmit={this.handlers.handleSubmit}>
            <ModalBody>
              {notice && <p>{notice}</p>}
              <Input
                name="reason"
                placeholder="Reason for call?"
                icon=""
                value={reason}
                onChange={this.handlers.handleChange}
              />
              {phoneNumberInput}
              <SqaushedSpaceBetween>
                <ModalHalfColumn>
                  <DatePicker
                    inputName="date"
                    chosenDate={date}
                    changeCallback={this.handlers.handleDateChange}
                    filterDate={this.handlers.filterDate}
                    minDateChoice={minDate}
                    maxDateChoice={maxDate}
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
              {/* <Column>
                <DatePicker
                  inputName="dateTime"
                  chosenDate={dateTime}
                  changeCallback={this.handlers.handleDateTimeChange}
                  showTimeSelect={true}
                  filterDate={this.handlers.filterDate}
                  minDateChoice={minDate}
                  maxDateChoice={maxDate}
                  includeTimes={includeTimes}
                />
              </Column> */}
              {this.state.errorMessages &&
                this.state.errorMessages.map(message => (
                  <FormError key={message}>{message}</FormError>
                ))}
            </ModalBody>
            <ModalSectionDivider />
            <ModalButtonsRight>
              <SmallButton buttonType="submit" text="Submit Request" />
              <SmallButton text="Cancel" negative onClick={hideModal} />
            </ModalButtonsRight>
          </form>
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

const mapStateToProps = state => {
  return {
    token: getToken(state),
    scheduledPhoneCallCase: getScheduledPhoneCallCase(state)
  };
};

const mapDispatchToProps = dispatch => ({
  createCase: (event, token) => {
    const { reason, phoneNumber, date, time } = event.target.elements;
    const scheduledDateTime = `${date.value.substring(6)}-${date.value.substring(
      0,
      2
    )}-${date.value.substring(3, 5)}T${time.value}`;

    dispatch(
      createSchedulePhoneCallCase({
        phoneNumber: phoneNumber.value,
        reasonForCall: reason.value,
        scheduleDateTime: scheduledDateTime,
        token: token
      })
    );
  },
  resetSchedulePhoneCall: () => {
    dispatch(schedulePhoneCallReset());
  },
  completeScheduledPhoneCallCase: (caseID, token) => {
    dispatch(completeScheduledPhoneCallCase({ caseID, token }));
  }
});

const ConnectedSchedulePhoneCallModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(SchedulePhoneCallModal);

export default ConnectedSchedulePhoneCallModal;
