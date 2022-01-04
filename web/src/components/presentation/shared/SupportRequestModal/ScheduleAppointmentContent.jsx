import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isEmpty } from 'lodash';
import defaultTheme from '../../../../style/themes';
import MobileButton from '../mobile/MobileButton';
import DatePicker from '../desktop/DatePicker';
import Select from '../desktop/Select';
import MobileActionButton from '../mobile/MobileActionButton';
import SubmissionResponse from './SubmissionResponse';

const {
  MobileModalBackButton,
  MobileModalDivider,
  MobileModalTitleWrapper,
  MobileModalTitle,
  MobileModalListTitle,
  MobileFixedBottomButton,
  MobileModalFlexColumn
} = defaultTheme.components;

const StyledMobileFixedBottomButton = styled(MobileFixedBottomButton)`
  border: none;
  padding: 0 0 16px;
`;

class ScheduleAppointmentContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      canSubmit: false,
      submitted: false,
      submissionStatus: 'pending',
      chosenMember: '',
      chosenProvider: '',
      chosenDate: '',
      chosenTime: ''
    };
  }

  goBack = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  setStep = step => {
    this.setState({ step });
  };

  handleMemberChoice = member => {
    const { canSubmit } = this.state;
    const step = canSubmit ? 5 : 2;
    this.setState({ chosenMember: member });
    this.setState({ step });
  };

  handleProviderChoice = providerNPI => {
    const { canSubmit } = this.state;
    const step = canSubmit ? 5 : 3;
    // TODO: Get Provider NPI to send along with submission
    // this.setState({ chosenProvider: providerNPI });
    this.setState({ step });
  };

  handleDateChoice = date => {
    const { canSubmit } = this.state;
    const step = canSubmit ? 5 : 4;
    this.setState({ chosenDate: date });
    this.setState({ step });
  };

  handleTimeChoice = e => {
    this.setState({ chosenTime: e.target.value });
    this.setState({ canSubmit: true });
    this.setState({ step: 5 });
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
      chosenMember,
      chosenProvider
    } = this.state;
    const { members, handleClose } = this.props;

    return (
      <>
        {!submitted ? (
          <MobileModalFlexColumn>
            <div>
              {step > 1 && step < 5 && !canSubmit && (
                <MobileModalBackButton type="button" onClick={this.goBack}>
                  Back
                </MobileModalBackButton>
              )}
              <MobileModalTitleWrapper>
                <MobileModalTitle>Request an appointment.</MobileModalTitle>
                <i className="material-icons">schedule</i>
              </MobileModalTitleWrapper>
              <MobileModalDivider />
              {step === 1 && (
                <>
                  <MobileModalListTitle>Who is this appointment for?</MobileModalListTitle>
                  {!isEmpty(members) &&
                    members.map(member => (
                      <MobileButton
                        text={`${member.first} ${member.last}`}
                        handleClick={() =>
                          this.handleMemberChoice(`${member.first} ${member.last}`)
                        }
                      />
                    ))}
                </>
              )}
              {step === 2 && (
                <>
                  <MobileModalListTitle>Choose a provider.</MobileModalListTitle>
                  <MobileButton
                    icon="search"
                    text="Find a Provider"
                    handleClick={() => this.handleProviderChoice()}
                    arrow={false}
                  />
                </>
              )}
              {step === 3 && (
                <>
                  <MobileModalListTitle>What Day?</MobileModalListTitle>
                  <DatePicker changeCallback={this.handleDateChoice} value={chosenDate} />
                </>
              )}
              {step === 4 && (
                <>
                  <MobileModalListTitle>What Time?</MobileModalListTitle>
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
              {step === 5 && (
                <>
                  <MobileModalListTitle>How does this look? Tap to edit.</MobileModalListTitle>
                  <MobileButton
                    icon="account_circle"
                    text={chosenMember}
                    handleClick={() => this.setStep(1)}
                    arrow={false}
                  />
                  <MobileButton
                    icon="account_box"
                    text={chosenProvider}
                    handleClick={() => this.setStep(2)}
                    arrow={false}
                  />
                  <MobileButton
                    icon="date_range"
                    text={chosenDate}
                    handleClick={() => this.setStep(3)}
                    arrow={false}
                  />
                  <MobileButton
                    icon="schedule"
                    text={chosenTime}
                    handleClick={() => this.setStep(4)}
                    arrow={false}
                  />
                </>
              )}
            </div>
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

ScheduleAppointmentContent.propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape({})),
  handleClose: PropTypes.func.isRequired
};

ScheduleAppointmentContent.defaultProps = {
  members: []
};

export default ScheduleAppointmentContent;
