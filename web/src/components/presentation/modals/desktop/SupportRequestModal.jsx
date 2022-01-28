import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import ColoredModalHeader from './ColoredModalHeader';
import SupportRequestTitle from './SupportRequestTitle';
import BigButtonContainer from '../../../containers/shared/desktop/BigButtonContainer';
import SmallButton from '../../shared/desktop/SmallButton';

// MODAL - Support Requests (Action Required, Pending, Completed)
// TODO: Need real phone #

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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;

  @media ${defaultTheme.device.tablet} {
    flex-direction: row;
  }
  & div {
    flex: 1 1 auto;
    @media ${defaultTheme.device.mobile} {
      flex: 1 1 0;
    }
  }

  .big-button {
    width: 100%;
  }
`;

const SupportRequestModal = React.memo(({ modalData, hideModal }) => (
  <>
    <Scrim onClick={hideModal} />
    <ModalWrapper>
      <ColoredModalHeader
        status={modalData.status === 'actionRequired' ? 'action required' : modalData.status}
        phoneNumber="1-800-234-4482"
      />
      <ModalBody>
        <SupportRequestTitle requestNumber={modalData.requestNumber} title={modalData.title} />
        <p>
          {modalData.status === 'action required'
            ? 'Please contact us below regarding this request.'
            : 'If you have questions or concerns, please contact customer support below.'}
        </p>
      </ModalBody>
      <ModalSectionDivider />
      <FormLabel>Contact Customer Support</FormLabel>
      {/* <SpaceBetween>
        <Column>
          <BigButtonContainer buttonKey="sendAMessage" />
        </Column>
        <Column>
          <BigButtonContainer buttonKey="schedulePhoneCall" />
        </Column>
      </SpaceBetween> */}
      <ButtonContainer>
        <div>
          <BigButtonContainer buttonKey="sendAMessage" />
        </div>
        <div>
          <BigButtonContainer buttonKey="schedulePhoneCall" />
        </div>
      </ButtonContainer>
      <ModalSectionDivider />
      <ButtonsCenter>
        <SmallButton negative text="Cancel" onClick={hideModal} />
      </ButtonsCenter>
    </ModalWrapper>
  </>
));

SupportRequestModal.propTypes = {
  modalData: PropTypes.shape({}).isRequired,
  hideModal: PropTypes.func.isRequired
};

export default SupportRequestModal;
