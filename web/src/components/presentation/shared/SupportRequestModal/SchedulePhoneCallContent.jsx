import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isEmpty } from 'lodash';
import defaultTheme from '../../../../style/themes';
import MobileButton from '../mobile/MobileButton';
import MobileActionButton from '../mobile/MobileActionButton';
import SubmissionResponse from './SubmissionResponse';
import DatePicker from '../desktop/DatePicker';
import Select from '../desktop/Select';

const {
  MobileModalBackButton,
  MobileModalFlexColumn,
  MobileFixedBottomButton,
  MobileModalDivider,
  MobileModalTitleWrapper,
  MobileModalTitle,
  MobileModalListTitle
} = defaultTheme.components;

const StyledMobileFixedBottomButton = styled(MobileFixedBottomButton)`
  border: none;
  padding: 0 0 16px;
`;

class SchedulePhoneCallContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      canSubmit: false,
      submitted: false,
      submissionStatus: 'pending',
      chosenDate: '',
      chosenTime: '',
      chosenPhoneNumber: ''
    };
  }

  goBack = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  setStep = step => {
    this.setState({ step });
  };

  handleDateChoice = chosenDate => {
    const { canSubmit } = this.state;
    const step = canSubmit ? 4 : 2;
    this.setState({ chosenDate });
    this.setState({ step });
  };

  handleTimeChoice = e => {
    const { canSubmit } = this.state;
    const step = canSubmit ? 4 : 3;
    this.setState({ chosenTime: e.target.value });
    this.setState({ step });
  };

  handlePhoneNumberChoice = chosenPhoneNumber => {
    this.setState({ chosenPhoneNumber });
    this.setState({ canSubmit: true });
    this.setState({ step: 4 });
  };

  handleSubmit = () => {
    // TODO: Send submission to API, display pending Submission Response Component
    // TODO: When submission response is received, display success/failure Submission Response Component

    // Placeholder
    this.setState({ submitted: true, submissionStatus: 'success' });
  };

  render() {
    const {
      step,
      canSubmit,
      submitted,
      submissionStatus,
      chosenDate,
      chosenTime,
      chosenPhoneNumber
    } = this.state;
    const { phoneNumbers, handleClose } = this.props;
    return (
      <>
        {step > 1 && step < 5 && !canSubmit && (
          <MobileModalBackButton type="button" onClick={this.goBack}>
            Back
          </MobileModalBackButton>
        )}
        {!submitted ? (
          <MobileModalFlexColumn>
            <MobileModalTitleWrapper>
              <MobileModalTitle>Schedule a phone call.</MobileModalTitle>
              <i className="material-icons">schedule</i>
            </MobileModalTitleWrapper>
            <MobileModalDivider />
            {step === 1 && (
              <>
                <MobileModalListTitle>What day?</MobileModalListTitle>
                <DatePicker changeCallback={this.handleDateChoice} value={chosenDate} />
              </>
            )}
            {step === 2 && (
              <>
                <MobileModalListTitle>What time?</MobileModalListTitle>
                <Select
                  icon="time"
                  value={chosenTime}
                  placeholder="Choose a time"
                  onChange={this.handleTimeChoice}
                >
                  <option>Morning (8am - 12pm)</option>
                  <option>Afternoon (12pm - 5pm)</option>
                </Select>
              </>
            )}
            {step === 3 && (
              <>
                <MobileModalListTitle>What phone number should we use?</MobileModalListTitle>
                {!isEmpty(phoneNumbers) &&
                  phoneNumbers.map(number => (
                    <MobileButton
                      text={`${number.phone_number}`}
                      handleClick={() => this.handlePhoneNumberChoice(number.phone_number)}
                    />
                  ))}
              </>
            )}
            {step === 4 && (
              <>
                <MobileModalListTitle>How does this look? Tap to edit.</MobileModalListTitle>
                <MobileButton
                  icon="date_range"
                  text={chosenDate}
                  handleClick={() => this.setStep(1)}
                  arrow={false}
                />
                <MobileButton
                  icon="schedule"
                  text={chosenTime}
                  handleClick={() => this.setStep(2)}
                  arrow={false}
                />
                <MobileButton
                  icon="phone"
                  text={chosenPhoneNumber}
                  handleClick={() => this.setStep(3)}
                  arrow={false}
                />
              </>
            )}
            {canSubmit ? (
              <StyledMobileFixedBottomButton>
                <MobileActionButton
                  text="Submit Request"
                  type="inverse"
                  onClick={this.handleSubmit}
                />
                <MobileActionButton
                  text="Cancel"
                  type="negative-transparent"
                  onClick={handleClose}
                />
              </StyledMobileFixedBottomButton>
            ) : (
              <StyledMobileFixedBottomButton>
                <MobileActionButton text="Cancel" type="negative" onClick={handleClose} />
              </StyledMobileFixedBottomButton>
            )}
          </MobileModalFlexColumn>
        ) : (
          <SubmissionResponse status={submissionStatus} handleClose={handleClose} />
        )}
      </>
    );
  }
}

SchedulePhoneCallContent.propTypes = {
  phoneNumbers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleClose: PropTypes.func.isRequired
};

export default SchedulePhoneCallContent;
