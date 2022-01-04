import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import defaultTheme from '../style/themes';
import MeetCareGuideModal from './presentation/modals/desktop/MeetCareGuideModal';

const { GlobalStyle, MobileContainer } = defaultTheme.components;

const Spacer = styled.div`
  margin-top: 64px;
`;

const TrimmedHeader = styled.div`
  height: 100px;
  margin-bottom: -48px;
  background: ${props => props.theme.colors.roles.danger};
  clip-path: polygon(20% 0%, 80% 0%, 100% 0, 100% 80%, 54% 100%, 40% 100%, 0 80%, 0 0);
  z-index: -1;
`;

const Header = styled.div`
  height: 144px;
  width: 100%;
  margin-bottom: -24px;
  background: ${props => props.theme.gradients.main};
`;

// const FullScreen = styled.div`
//   display: flex;
//   align-items: center;
//   height: 100vh;
//   width: 100vw;
//   background: ${props => props.theme.gradients.main};
// `;

const Sandbox = () => (
  <ThemeProvider theme={defaultTheme}>
    <>
      <GlobalStyle />
      <Header>
        <MobileContainer />
      </Header>
      <MeetCareGuideModal />
    </>
  </ThemeProvider>
);

export default Sandbox;
