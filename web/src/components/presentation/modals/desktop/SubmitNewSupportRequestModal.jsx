import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import BigButtonContainer from '../../../containers/shared/desktop/BigButtonContainer';
import SmallButton from '../../shared/desktop/SmallButton';
import selectors from '@evry-member-app/shared/store/selectors';

const { getSupportPhoneNumber } = selectors;

// MODAL - Submit New Support Request

const {
  FormLabel,
  Scrim,
  ModalBody,
  ModalButtonsRight,
  ModalHeader,
  ModalSectionDivider,
  ModalTitle,
  ModalWrapper,
  SpaceBetween
} = defaultTheme.components;

const SqaushedSpaceBetween = styled(SpaceBetween)`
  margin: -24px 0 -8px;
`;

const Column = styled.div`
  width: calc(50% - 8px);

  .big-button {
    width: 100%;
    margin-bottom: 8px;
  }
`;

const PhoneNumber = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.shades.blue};

  p {
    margin: 0 0 0 8px;
    font-weight: 400;
  }
`;

const SubmitNewSupportRequestModal = React.memo(({ phoneNumber, hideModal }) => (
  <>
    <Scrim onClick={hideModal} />
    <ModalWrapper>
      <ModalHeader>
        <SpaceBetween>
          <ModalTitle>Submit a New Support Request</ModalTitle>
          {phoneNumber && (
            <PhoneNumber>
              <i className="material-icons">phone</i>
              <p>{`1-${phoneNumber}`}</p>
            </PhoneNumber>
          )}
        </SpaceBetween>
      </ModalHeader>
      <ModalBody>
        <SqaushedSpaceBetween>
          <Column>
            <FormLabel>Concierge Care</FormLabel>
            <BigButtonContainer buttonKey="requestInformation" />
            <BigButtonContainer buttonKey="scheduleAppointment" />
          </Column>
          <Column>
            <FormLabel>Contact Customer Support</FormLabel>
            <BigButtonContainer buttonKey="sendAMessage" />
            <BigButtonContainer buttonKey="schedulePhoneCall" />
          </Column>
        </SqaushedSpaceBetween>
      </ModalBody>
      <ModalSectionDivider />
      <ModalButtonsRight>
        <SmallButton text="Submit Request" />
        <SmallButton text="Cancel" negative onClick={hideModal} />
      </ModalButtonsRight>
    </ModalWrapper>
  </>
));

SubmitNewSupportRequestModal.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
  hideModal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  phoneNumber: getSupportPhoneNumber(state)
});

export default connect(mapStateToProps)(SubmitNewSupportRequestModal);
