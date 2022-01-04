import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import ClaimsColoredModalHeader from './ClaimsColoredModalHeader';
import ClaimsSupportTitle from './ClaimsSupportTitle';
import BigButtonContainer from '../../../containers/shared/desktop/BigButtonContainer';
import SmallButton from '../../shared/desktop/SmallButton';

// MODAL - Claims Support

const {
  FormLabel,
  Scrim,
  ModalBody,
  ModalSectionDivider,
  ModalWrapper,
  SpaceBetween
} = defaultTheme.components;

const ButtonsCenter = styled.div`
  display: flex;
  justify-content: center;

  > * {
    margin: 0 8px;
  }
`;

const Column = styled.div`
  width: calc(50% - 8px);

  .big-button {
    width: 100%;
    margin-bottom: 8px;
  }
`;

const ClaimsSupportModal = React.memo(
  ({ claimNumber, hideModal, message, modalData, status, title }) => (
    <>
      <Scrim onClick={hideModal} />
      <ModalWrapper>
        <ClaimsColoredModalHeader status={modalData.status} phoneNumber="1-800-234-4482" />
        <ModalBody>
          <ClaimsSupportTitle
            claimNumber={modalData.claimNumber}
            title={modalData.provider || 'Provider Name Not Listed.'}
          />
          <p>
            If you have questions or concerns about this claim, please contact customer support
            below.
          </p>
        </ModalBody>
        <ModalSectionDivider />
        <FormLabel>Contact Customer Support</FormLabel>
        <SpaceBetween>
          <Column>
            <BigButtonContainer buttonKey="sendAMessage" />
          </Column>
          <Column>
            <BigButtonContainer buttonKey="schedulePhoneCall" />
          </Column>
        </SpaceBetween>
        <ModalSectionDivider />
        <ButtonsCenter>
          <SmallButton negative text="Cancel" onClick={hideModal} />
        </ButtonsCenter>
      </ModalWrapper>
    </>
  )
);

ClaimsSupportModal.propTypes = {
  claimNumber: PropTypes.number.isRequired,
  modalData: PropTypes.shape({}).isRequired,
  hideModal: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['APPROVED', 'DENY', 'CLOSED']).isRequired,
  title: PropTypes.string.isRequired
};

export default ClaimsSupportModal;
