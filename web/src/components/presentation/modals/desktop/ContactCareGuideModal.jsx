import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import BigButtonContainer from '../../../containers/shared/desktop/BigButtonContainer';
import SmallButton from '../../shared/desktop/SmallButton';
import ContactCareGuideProfile from '../../shared/desktop/ContactCareGuideProfile';
import Loader from '../../shared/Loader/Loader';
import actions from '@evry-member-app/shared/store/actions';
import { useDispatch } from 'react-redux';
// MODAL - Contact Care Guide
// TODO: Message & Phone Call Buttons should specify on backend that they are for Care Guide
// TODO: Add Care Guide image

const { showModal } = actions;

const {
  FormLabel,
  Scrim,
  ModalBody,
  ModalButtonsCenter,
  ModalSectionDivider,
  ModalWrapper,
  SpaceBetween
} = defaultTheme.components;

const ScrollableModalWrapper = styled(ModalWrapper)`
  overflow-y: auto;
  height: 100%;

  @media (min-height: 650px) {
    height: auto;
  }
`;

const Header = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

const ColoredBackground = styled.div`
  position: absolute;
  height: 84%;
  top: 0;
  right: 0;
  left: 0;
  background: ${props => props.theme.colors.shades.nearlyWhite};
  border-radius: 4px 4px 0 0;
  z-index: -1;
  margin: -48px -48px 0;
`;

const CenterText = styled.div`
  margin: 16px 0;
  display: flex;
  justify-content: center;
  text-align: center;

  p {
    max-width: 432px;
    color: ${props => props.theme.colors.shades.mediumGray};
  }

  a {
    text-decoration: none;
    color: ${props => props.theme.colors.shades.pinkOrange};
    text-decoration: underline;
  }
`;

const Title = styled.h2`
  margin: 0;
  font-weight: 300;
  color: ${props => props.theme.colors.shades.blue};
`;

const SqaushedSpaceBetween = styled(SpaceBetween)`
  margin: -24px 0 -8px;
`;

const SmallButtonLink = styled(SmallButton)`
  border: none;
`;

const Column = styled.div`
  width: 100%;
  margin-left: -16px;

  @media ${defaultTheme.device.mobile} {
    width: calc(75% - 8px);
  }
  @media ${defaultTheme.device.tablet} {
    width: calc(50% - 8px);
  }

  .big-button {
    width: 100%;
    margin-bottom: 8px;
  }
`;

const StyledAnchor = styled.a`
  cursor: pointer;
`;

const ContactCareGuideModal = React.memo(({ hideModal, careGuide, name }) => {
  const dispatch = useDispatch();

  const showConciergeCareHandler = () => {
    dispatch(showModal('CONCIERGE_CARE'));
  };

  return (
    <>
      <Scrim onClick={hideModal} />
      <ScrollableModalWrapper>
        <Header>
          {!careGuide ? (
            <Loader />
          ) : (
            <>
              <ColoredBackground />
              {(careGuide.error && careGuide.error.length > 0) || !careGuide.first_name ? (
                <ContactCareGuideProfile />
              ) : (
                <ContactCareGuideProfile
                  name={`${careGuide.first_name} ${careGuide.last_name}`}
                  roleLabel="Your Care Guide"
                  number={`${careGuide.phone.phone_number} ${
                    careGuide.phone.phone_number_extension &&
                    careGuide.phone.phone_number_extension.trim().length > 0
                      ? `(Ext - ${careGuide.phone.phone_number_extension})`
                      : ''
                  }`}
                  email={careGuide.email.email_address}
                  imgSrc="https://randomuser.me/api/portraits/women/58.jpg"
                />
              )}
            </>
          )}
        </Header>
        <ModalBody>
          <ModalSectionDivider />
          <CenterText>
            <Title>{name ? `Hi ${name.first}, how can I help?` : 'Hi, how can I help?'}</Title>
          </CenterText>
          <ModalButtonsCenter>
            <Column>
              <BigButtonContainer buttonKey="requestInformation" />
              <BigButtonContainer buttonKey="sendAMessage" />
              <BigButtonContainer buttonKey="schedulePhoneCall" />
            </Column>
          </ModalButtonsCenter>
          <CenterText>
            <p>
              What all can your Care Coordinator do for you? Visit our Help Center to learn more
              about{' '}
              <StyledAnchor onClick={showConciergeCareHandler}>Evry's Concierge Care</StyledAnchor>.
            </p>
          </CenterText>
        </ModalBody>
        <ModalSectionDivider />
        <ModalButtonsCenter>
          <SmallButton text="Cancel" negative onClick={hideModal} />
        </ModalButtonsCenter>
      </ScrollableModalWrapper>
    </>
  );
});

ContactCareGuideModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  careGuide: PropTypes.shape({}).isRequired,
  name: PropTypes.shape({}).isRequired
};

export default ContactCareGuideModal;
