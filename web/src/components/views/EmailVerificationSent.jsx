import React, { useState } from 'react';
import styled from 'styled-components';
import { Mobile } from '../layouts';
import defaultTheme from '../../style/themes';
import { Helmet } from 'react-helmet-async';

import { connect } from 'react-redux';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';

const { MobileContentWrapper } = defaultTheme.components;

const EditedMobileContentWrapper = styled(MobileContentWrapper)`
  padding-top: 48px;
`;

const Container = styled.div`
  display: grid;
  justify-content: center;
  background-color: #F4F4F4;
  margin-top: 100px;
  grid-template-areas: "check text .";
  grid-template-columns: 1fr auto 1fr;
  column-gap: 50px;

  @media (max-width: 1000px) {
    grid-template-areas: "check" "text"; 
    grid-template-columns: 1fr;
  }
`;

const ActionButton = styled.button`
  box-sizing: border-box;
  padding: 22px;
  font-size: 20px;
  font-weight: 500;    
  width: 100%;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;
  background:#4E7082;
  color: ${props => props.theme.colors.shades.white};
  outline: none;
  border: none;
  border-radius: 4px;
  box-shadow: 0px 20px 30px rgb(0 0 0 / 15%);
  margin: 100px 0 50px 0;

  &:hover {
    opacity: 0.8;
  }
`;

const Header = styled.div`
  color: #00263A;
  font-weight: 500;
  font-size: 28px;
`;

const Separator = styled.div`
  border-bottom: 1px solid #ddd;
  width: 100%;
  margin: 25px 0;
`;

const Body = styled.div`
  font-size: 16px;
  padding: 25px 0 50px 0;
`;

const VerificationContainer = styled.div`
  display: flex;
  flex-direction: column;            
  grid-area: text;
  place-self: center;
`;

const Center = styled.div`
  align-self: center;
  max-width: 300px;
  width: 100%;
`;

const EmailResentAlert = styled.div`
  text-align: center;
  color: #8ED081;
  font-size: 18px;
  font-weight: 500;
  text-transform: uppercase;
`;

const EmailVerificationSent = props => {
  const [ buttonClicked, setButtonClicked ] = useState(false);

  function handleResend(e) {
    e.preventDefault();

    setButtonClicked(true);

    props.handleSubmit(props.token);
  }

  return (
    <>
      <Helmet>
        <title>{reflection.layoutProps.navProps.title} - Evry Health</title>
      </Helmet>
      <EditedMobileContentWrapper>
        <Container>
          <VerificationContainer>
            <Header>Email Verification Sent</Header>
            <Separator />
            <Body>
              Please check your email for the verification link.
              If you haven't got it, you can use the button below to send it again.
            </Body>
            <Separator />
            <Center>
              <ActionButton onClick={handleResend}>Send Link Again</ActionButton>
              {buttonClicked && <EmailResentAlert>Link sent to email!</EmailResentAlert>}
            </Center>
          </VerificationContainer>
        </Container>
      </EditedMobileContentWrapper>
    </>
  );
};

const mapStateToProps = state => ({
  token: selectors.getToken(state)
});

const mapDispatchToProps = dispatch => ({
  handleSubmit: (token) => {
    dispatch(actions.verifyEmail(token));
  }
});

const ConnectedEmailVerificationSent = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailVerificationSent);

const reflection = {
  component: ConnectedEmailVerificationSent,
  layout: Mobile,
  layoutProps: {
    titleWrapperClass: 'none',
    navProps: {
      left: 'back',
      title: 'Email Verification Sent',
      permanentTitle: true,
      permanentBg: true
    }
  },
  route: '/email-verification-sent'
};

export default EmailVerificationSent;

export { reflection };
