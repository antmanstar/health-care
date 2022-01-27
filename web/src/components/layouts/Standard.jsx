import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NavBar from '../presentation/shared/DesktopNavBar';
import ViewTitle from '../presentation/shared/desktop/ViewTitle';
import SearchBar from '../presentation/shared/desktop/SearchBar';
import Footer from '../presentation/shared/Footer';

// Inline components
const Header = styled.header`
  background: ${props => props.theme.gradients.main};
  padding-bottom: 75px;

  @media (max-width: 1200px) {
    padding-bottom: 70px;
  }
`;

const MainSection = styled.div`
  position: relative;
`;

const Standard = props => {
  const { title, children } = props;

  return (
    <>
      <Header className="standard-desktop-header">
        <NavBar />
        <ViewTitle title={title} memberId="EVR123456789" groupId="123456" />
      </Header>
      <MainSection className="standard-desktop-section">
        <SearchBar />
        {children}
      </MainSection>
      <Footer />
    </>
  );
};

Standard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

Standard.defaultProps = {
  children: "You shouldn't be seeing this; layouts should always contain views."
};

export default Standard;
