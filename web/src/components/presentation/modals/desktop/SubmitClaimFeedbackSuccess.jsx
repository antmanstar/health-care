import React from 'react';
import { connect } from 'react-redux';
import defaultTheme from '../../../../style/themes';
import styled from 'styled-components';
import actions from '@evry-member-app/shared/store/actions';
import success from '../../../../../../assets/images/vector/success-icon.svg';
import SmallButton from '../../shared/desktop/SmallButton';

const { clearSendingFeedback } = actions;

const {
  FormLabel,
  Scrim,
  ModalBody,
  ModalButtonsRight,
  ModalHeader,
  ModalSectionDivider,
  ModalTextArea,
  ModalTitle
} = defaultTheme.components;

const ModalWrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 48px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 20px 30px rgb(0 0 0 / 15%);
  min-width: 60%;
  z-index: 100;
  @media screen and (min-width: 1200px) {
    min-width: 528px;
  }

  .modal-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .close-button {
    justify-content: center;
    width: 100px;
    margin-top: 30px;
    @media screen and (min-width: 1200px) {
      margin-top: 60px;
    }
  }
`;

const SuccessIcon = styled.img``;

const Label = styled.p`
  margin-top: 32px;
  margin-bottom: 0;
  color: #00263a;
  font-size: 24px;
  line-height: 28.13px;
  font-family: 'Roboto';
  font-weight: 700;
`;

const Text = styled.p`
  margin: 8px auto;
  font-size: 24px;
  line-height: 28.13px;
  color: #4a4a4b;
  font-family: 'Roboto';
  font-weight: 300;
  @media screen and (min-width: 1200px) {
    margin: 16px auto;
  }
`;

const SubmitClaimFeedbackSuccess = ({ hideModal, clearSendingFeedback }) => {
  const closeModal = () => {
    hideModal();
    clearSendingFeedback();
  };

  return (
    <>
      <Scrim onClick={closeModal} />
      <ModalWrapper className="narrow">
        <ModalBody className="modal-body">
          <SuccessIcon src={success} />
          <Label>Submitted!</Label>
          <Text>Thank you for your feedback!</Text>
          <SmallButton className="close-button" text="Close" onClick={() => closeModal()} />
        </ModalBody>
      </ModalWrapper>
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  clearSendingFeedback: () => {
    dispatch(clearSendingFeedback());
  }
});

export default connect(null, mapDispatchToProps)(SubmitClaimFeedbackSuccess);
