import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import actions from '@evry-member-app/shared/store/actions';
import images from '../../../../utils/images';
import SmallButton from '../../shared/desktop/SmallButton';

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
const SubmissionResponseModal = props => {
  const { type, title, message } = props.modalData;
  return (
    <Fragment>
      <Scrim onClick={props.hideModal} />
      <ModalWrapper className="extra-narrow">
        <ModalBodyColumn>
          {type === 'SUCCESS' && <Img src={images['check-in-circle']} alt="" />}
          <SubTitle>{title}</SubTitle>
          <p>{message}</p>
        </ModalBodyColumn>
        <ModalSectionDivider />
        <ModalButtonsCenter>
          <SmallButton text="Close" onClick={props.hideModal} />
        </ModalButtonsCenter>
      </ModalWrapper>
    </Fragment>
  );
};

export default SubmissionResponseModal;
