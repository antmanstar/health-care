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
    margin: 0 0 0 8px;
    font-weight: 400;
  }
`;

const Span = styled.span`
  font-weight: 500;
  color: ${props => props.theme.colors.shades.blue};
  display: inline-block;
`;

const LINK = styled.a`
  display: inline-block;

  img {
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 10px;
    max-width: 200px;
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
        <p>
          <Span>You always have a digital card available through our mobile app.&nbsp;</Span>
          You can also download a new temporary card to print yourself or request a new one be sent
          to you.
        </p>
        <FormLabel>Get the App</FormLabel>
        <LINK href="http://www.google.com">
          <img src={images["app-store"]} alt="Evry iOS App" />
        </LINK>
        <LINK href="http://www.google.com">
          <img src={images["google-play"]} alt="Evry Android App" />
        </LINK>
        {/* TODO: Add URLs to the proper app store locations */}

        <FormLabel>Get your New Membership Card</FormLabel>
        <SpaceBetween>
          <Column>
            <BigButtonContainer buttonKey="downloadMembershipCard" />
          </Column>
          <Column>
            <BigButtonContainer buttonKey="requestMembershipCard" />
          </Column>
        </SpaceBetween>
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
