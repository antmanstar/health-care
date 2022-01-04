import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import Select from '../desktop/Select';
import MobileActionButton from '../mobile/MobileActionButton';
import SubmissionResponse from './SubmissionResponse';
import images from '../../../../utils/images';

const {
  MobileModalFlexColumn,
  MobileModalDivider,
  MobileModalTitleWrapper,
  MobileModalTitle,
  MobileModalListTitle,
  MobileTextArea,
  MobileFixedBottomButton
} = defaultTheme.components;

const StyledMobileFixedBottomButton = styled(MobileFixedBottomButton)`
  border: none;
  padding: 0 0 16px;
`;

class RequestInformationContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false,
      submitted: false,
      submissionStatus: 'pending',
      informationType: '',
      message: ''
    };
  }

  handleChange = event => {
    const stateObject = {};
    stateObject[event.target.name] = event.target.value;
    this.setState(stateObject);
  };

  checkCanSubmit = () => {
    const { informationType, message } = this.state;
    if (informationType === '' || message === '') {
      return;
    }
    this.setState({ canSubmit: true });
  };

  handleSubmit = () => {
    // TODO: Send submission to API, display pending Submission Response Component
    // TODO: When submission response is received, display success/failure Submission Response Component

    // Placeholder
    this.setState({ submitted: true, submissionStatus: 'success' });
  };

  render() {
    const { canSubmit, submitted, submissionStatus, informationType, message } = this.state;
    const { handleClose } = this.props;

    !canSubmit && this.checkCanSubmit();

    return (
      <>
        {!submitted ? (
          <MobileModalFlexColumn>
            <MobileModalTitleWrapper>
              <MobileModalTitle>Request information.</MobileModalTitle>
              <img src={images["white_icons/folded-paper"]} alt="Request Information" />
            </MobileModalTitleWrapper>
            <MobileModalDivider />
            <MobileModalListTitle>Tap on field to edit it.</MobileModalListTitle>
            <Select
              name="informationType"
              placeholder="Information Type"
              value={informationType}
              onChange={this.handleChange}
            >
              <option>Careplan</option>
              <option>Claims</option>
              <option>Rewards</option>
              <option>General</option>
            </Select>
            <MobileTextArea
              name="message"
              placeholder="Type a message here."
              rows="10"
              value={message}
              onChange={this.handleChange}
            />
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

RequestInformationContent.propTypes = {
  handleClose: PropTypes.func.isRequired
};

export default RequestInformationContent;
