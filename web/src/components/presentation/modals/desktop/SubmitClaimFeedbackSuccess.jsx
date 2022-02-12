import React from 'react';
import { connect } from 'react-redux';
import defaultTheme from '../../../../style/themes';
import styled from 'styled-components';
import actions from '@evry-member-app/shared/store/actions';
import images from '../../../../utils/images';
import SmallButton from '../../shared/desktop/SmallButton';

const { clearSendingFeedback } = actions;

const {
  Scrim,
  ModalWrapper,
  ModalBody,
  ModalSectionDivider,
  ModalButtonsCenter
} = defaultTheme.components;

const ModalBodyColumn = styled(ModalBody)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SubTitle = styled.h2`
  color: ${defaultTheme.colors.shades.blue};
`;
const Img = styled.img`
  width: 128px;
`;
const SubmitClaimFeedbackSuccess = ({ hideModal, clearSendingFeedback, type, title, message }) => {
  const closeModal = () => {
    hideModal();
    clearSendingFeedback();
  };
  return (
    <>
      <Scrim onClick={closeModal} />
      <ModalWrapper className="extra-narrow">
        <ModalBodyColumn>
          <Img src={images['check-in-circle']} alt="" />
          <SubTitle>Submitted!</SubTitle>
          <p>Thank you for your feedback!</p>
        </ModalBodyColumn>
        <ModalSectionDivider />
        <ModalButtonsCenter>
          <SmallButton text="Close" onClick={closeModal} />
        </ModalButtonsCenter>
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
