import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { Sparse } from '../layouts';
import defaultTheme from '../../style/themes';
import CheckCircle from '@evry-member-app/assets/images/vector/check-in-circle.svg';
import { Helmet } from 'react-helmet-async';

const { LayoutWrapper } = defaultTheme.components;

const Container = styled.div`
  display: grid;
  justify-content: center;
  grid-template-areas: "check text .";
  grid-template-columns: 1fr auto 1fr;
  column-gap: 50px;

  @media (max-width: 1000px) {
    grid-template-areas: "check" "text"; 
    grid-template-columns: 1fr;
  }
`;

const Header = styled.div`
  color: #00263A;
  font-weight: 500;
  font-size: 28px;
`;

const FeedbackIcon = styled.img`
  width: 150px;
  height: 150px;
  margin-top: 25px;
  grid-area: check;
  justify-self: end;

  @media (max-width: 1000px) {
    justify-self: center;
    margin-bottom: 50px;
  }
`;

const VerificationBody = styled.div`
  font-size: 16px;
  padding: 0;

  @media ${props => props.theme.device.tabletXL} {
    padding: 10px 0 10px 0;
  }
`;

const VerificationContainer = styled.div`
  display: flex;
  flex-direction: column;            
  grid-area: text;
  place-self: center;
`;

const Separator = styled.div`
  border-bottom: 1px solid #ddd;
  width: 100%;
  margin: 25px 0;
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  background: ${props => props.bgColor};
  color: ${props => props.theme.colors.shades.white};
  outline: none;
  border: none;
  border-radius: 4px;
  box-shadow: 0px 20px 30px rgb(0 0 0 / 15%);
  margin: 25px 0 25px 0;
  max-width: 300px;

  @media ${props => props.theme.device.tabletXL} {
    margin: 25px 0 25px 0;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const WideActionButton = styled(ActionButton)`
  width: 200px;
`;

class PasswordResetSuccess extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LayoutWrapper>
        <Helmet>
          <title>{reflection.layoutProps.title} - Evry Health</title>
        </Helmet>
        <LayoutWrapper>
          <Helmet>
            <title>{reflection.layoutProps.title} - Evry Health</title>
          </Helmet>
          <Container>
            <FeedbackIcon src={CheckCircle} />
            <VerificationContainer>
              <Header>Password Reset!</Header>
              <Separator />
              <VerificationBody>
                Your password has successfully been reset, please sign in.
              </VerificationBody>
              <Separator />
              <Center>
                <RouterLink to="/sign-in">
                  <WideActionButton bgColor="#8ED081">Sign In</WideActionButton>
                </RouterLink>
              </Center>
            </VerificationContainer>
          </Container>
        </LayoutWrapper>
      </LayoutWrapper>
    );
  }
}

const mapStateToProps = state => ({
  
});

const mapDispatchToProps = dispatch => ({
  
});

const ConnectedPasswordResetSuccess = connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordResetSuccess);

const reflection = {
  component: ConnectedPasswordResetSuccess,
  layout: Sparse,
  layoutProps: {
    title: 'Evry Member Portal',
    subtitle: "Password reset!"
  },
  route: '/password-reset-success'
};

export default ConnectedPasswordResetSuccess;

export { reflection };
