import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import BigButtonContainer from '../../../containers/shared/desktop/BigButtonContainer';
import SmallButton from '../../shared/desktop/SmallButton';
import selectors from '@evry-member-app/shared/store/selectors';
import images from '../../../../utils/images';

const { getSupportPhoneNumber } = selectors;

// MODAL - Request New Membership Card

const {
  FormLabel,
  Scrim,
  ModalBody,
  ModalButtonsCenter,
  ModalHeader,
  ModalSectionDivider,
  ModalTitle,
  ModalWrapper,
  SpaceBetween
} = defaultTheme.components;

const PhoneNumber = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.shades.blue};

  svg {
    height: 20px;
  }

  p {
    //margin: 0 0 0 8px;
    font-weight: 400;
    white-space: nowrap;
  }
`;

const Span = styled.span`
  font-weight: 600;
  color: ${props => props.theme.colors.shades.blue};
  display: inline-block;
`;

const LINK = styled.a`
  display: inline-block;

  img {
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 10px;
    //max-width: 200px;
    max-height: 50px;
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
  align-items: stretch;
  gap: 10px;

  @media ${defaultTheme.device.tablet} {
    flex-direction: row;
  }
  .big-button {
    width: 100%;
    @media ${defaultTheme.device.tablet} {
      width: 48%;
    }
  }
`;

const RequestNewMembershipCardModal = React.memo(({ hideModal, phoneNumber }) => (
  <>
    <Scrim onClick={hideModal} />
    <ModalWrapper>
      <ModalHeader>
        <SpaceBetween>
          <ModalTitle>New Membership Card</ModalTitle>
          {phoneNumber && (
            <PhoneNumber>
              <i className="material-icons">phone</i>
              <p>{`1-${phoneNumber}`}</p>
            </PhoneNumber>
          )}
        </SpaceBetween>
      </ModalHeader>
      <ModalBody>
        <ButtonContainer>
          <BigButtonContainer buttonKey="downloadMembershipCard" />
          <BigButtonContainer buttonKey="requestMembershipCard" />
        </ButtonContainer>
      </ModalBody>
      <ModalSectionDivider />
      <ModalButtonsCenter>
        <SmallButton text="Cancel" negative onClick={hideModal} />
      </ModalButtonsCenter>
    </ModalWrapper>
  </>
));

RequestNewMembershipCardModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  phoneNumber: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  phoneNumber: getSupportPhoneNumber(state)
});

export default connect(mapStateToProps)(RequestNewMembershipCardModal);
