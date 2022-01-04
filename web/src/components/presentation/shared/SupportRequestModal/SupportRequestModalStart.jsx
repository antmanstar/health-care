import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MobileButton from '../mobile/MobileButton';
import defaultTheme from '../../../../style/themes';
import MobileActionButton from '../mobile/MobileActionButton';

const {
  MobileModalDivider,
  MobileModalTitle,
  MobileModalListTitle,
  MobileFixedBottomButton,
  MobileModalFlexColumn
} = defaultTheme.components;

const Title = styled(MobileModalTitle)`
  padding-top: 64px;
`;

const StyledMobileFixedBottomButton = styled(MobileFixedBottomButton)`
  border: none;
  padding: 0 0 16px;
`;

const SupportRequestModalStart = ({ phoneNumber, updateContent, handleClose }) => (
  <MobileModalFlexColumn>
    <Title>New Support Request</Title>
    <MobileModalDivider />
    <MobileModalListTitle>Concierge Care</MobileModalListTitle>
    <MobileButton
      icon="insert_drive_file"
      text="Request Information"
      handleClick={() => updateContent('REQUEST_INFORMATION')}
    />
    <MobileButton
      icon="schedule"
      text="Schedule Medical Appointment"
      handleClick={() => updateContent('SCHEDULE_APPOINTMENT')}
    />
    <MobileModalListTitle>Contact Customer Support</MobileModalListTitle>
    <MobileButton
      icon="message"
      text="Send a Message"
      handleClick={() => updateContent('SEND_A_MESSAGE')}
    />
    <MobileButton
      icon="schedule"
      text="Schedule a Phone Call"
      handleClick={() => updateContent('SCHEDULE_PHONE_CALL')}
    />
    <MobileButton icon="phone" text={phoneNumber && `1-${phoneNumber}`} arrow={false} />
    <StyledMobileFixedBottomButton>
      <MobileActionButton text="Cancel" type="negative" onClick={handleClose} />
    </StyledMobileFixedBottomButton>
  </MobileModalFlexColumn>
);

SupportRequestModalStart.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
  updateContent: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default SupportRequestModalStart;
