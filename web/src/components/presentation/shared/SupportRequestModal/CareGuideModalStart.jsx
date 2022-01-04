import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import MobileCareGuideProfile from '../../support/mobile/MobileCareGuideProfile';
import MobileButton from '../mobile/MobileButton';
import MobileActionButton from '../mobile/MobileActionButton';

const { MobileModalFlexColumn, MobileFixedBottomButton } = defaultTheme.components;

// MOBILE: Care Guide Modal Content

const CareGuideWrapper = styled.div`
  padding: 56px 0 32px;
`;

const Message = styled.h2`
  margin: 0 auto 32px;
  font-weight: 300;
  text-align: center;
`;

const StyledMobileFixedBottomButton = styled(MobileFixedBottomButton)`
  border: none;
  padding: 0 0 16px;
`;

class CareGuideModalStart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: false
    };

    this.handlers = {
      handleContactClick: this.handleContactClick.bind(this)
    };
  }

  handleContactClick() {
    this.setState({ contact: true });
  }

  render() {
    const { contact } = this.state;
    const { careGuide, updateContent, handleClose } = this.props;
    return (
      <MobileModalFlexColumn>
        <div>
          <CareGuideWrapper>
            <MobileCareGuideProfile
              name={careGuide && `${careGuide.first_name} ${careGuide.last_name}`}
              imgSrc="https://randomuser.me/api/portraits/women/58.jpg"
              inverse
            />
          </CareGuideWrapper>
          <Message>{contact ? 'Get in touch.' : 'How can I help?'}</Message>
          {contact ? (
            <>
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
              <MobileButton icon="phone" text={careGuide.phone.phone_number} arrow={false} />
            </>
          ) : (
            <>
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
              <MobileButton
                icon="phone"
                text={
                  careGuide !== undefined ? `Contact ${careGuide.first_name}` : 'Contact Care Guide'
                }
                handleClick={this.handlers.handleContactClick}
              />
            </>
          )}
        </div>
        <StyledMobileFixedBottomButton>
          <MobileActionButton text="Cancel" type="negative" onClick={handleClose} />
        </StyledMobileFixedBottomButton>
      </MobileModalFlexColumn>
    );
  }
}

CareGuideModalStart.propTypes = {
  careGuide: PropTypes.shape({}).isRequired,
  updateContent: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default CareGuideModalStart;
