import React from 'react';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import SmallButton from '../../shared/desktop/SmallButton';

const { Scrim, ModalWrapper } = defaultTheme.components;

const StyledModalWrapper = styled(ModalWrapper)`
  width: 80%;
  max-width: 540px;
  display: flex;
  flex-direction: column;
  padding: 0;
  min-width: unset;
`;

const InnerContentHeader = styled.div`
  display: flex;
  font-size: 50px;
  font-weight: 500;
  color: ${defaultTheme.colors.shades.blue};
  background: ${defaultTheme.colors.shades.nearlyWhite};
  padding: 32px 0px 20px 67px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;

  @media ${defaultTheme.device_up.tablet} {
    padding: 32px 0px 20px 16px;
  }
`;

const InnerContentBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-contnet: center;
  padding: 44px 48px 32px 67px;
  @media ${defaultTheme.device_up.tablet} {
    padding: 32px 8px 20px 16px;
  }
`;

const Content = styled.div`
  font-size: 20px;
  font-weight: 300;
  color: ${defaultTheme.colors.shades.darkGray};
`;

const ContactInfo = styled.div`
  display: flex;
  margin-top: 24px;
  width: 100%;
  align-items: center;
  color: ${defaultTheme.colors.shades.blue};

  @media ${defaultTheme.device_up.tablet} {
    flex-direction: column;
    justfiy-content: center;
  }
`;

const PhoneInfo = styled.div`
  align-items: center;
  display: flex;

  @media ${defaultTheme.device_up.tablet} {
    min-width: 210px;
  }
`;

const VerticalDivider = styled.div`
  width: 1px;
  background: #dadada;
  height: 28px;
  margin: auto 20px;

  @media ${defaultTheme.device_up.tablet} {
    display: none;
  }
`;

const MailInfo = styled.div`
  align-items: center;
  display: flex;

  @media ${defaultTheme.device_up.tablet} {
    min-width: 210px;
  }
`;

const StyeldIcon = styled.i`
  font-size: 28px;
  color: ${defaultTheme.colors.shades.blue};
  margin-right: 5px;
`;

const HorizontalDivider = styled.div`
  height: 1px;
  background: ${defaultTheme.colors.shades.lightGray};
  width: 100%;
  margin: 38px auto 22px auto;
`;

const StyledButton = styled(SmallButton)`
  width: 154px;
  height: 48px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  justify-content: center;
  filter: drop-shadow(0px 20px 30px rgba(0, 0, 0, 0.15));
`;

const ErrorModal = props => {
  return (
    <>
      {/* <Scrim onClick={props.hideModal} /> */}
      <Scrim />
      <StyledModalWrapper>
        <InnerContentHeader>500 Error</InnerContentHeader>
        <InnerContentBody>
          <Content>
            That didn’t go quite right. Try to refresh the page or contact us if the problem
            persists.
          </Content>
          <ContactInfo>
            <PhoneInfo>
              <StyeldIcon className="material-icons">phone</StyeldIcon>
              1-800-555-1234
            </PhoneInfo>
            <VerticalDivider />
            <MailInfo>
              <StyeldIcon className="material-icons">mail_outline</StyeldIcon>
              support@evryhealth.com
            </MailInfo>
          </ContactInfo>
          <HorizontalDivider />
          <StyledButton text="refresh" onClick={() => window.location.reload()} />
        </InnerContentBody>
      </StyledModalWrapper>
    </>
  );
};

export default ErrorModal;
