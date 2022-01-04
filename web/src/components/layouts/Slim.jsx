import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NavBar from '../presentation/shared/NavBar';
import ViewTitle from '../presentation/shared/desktop/ViewTitle';
import SearchBar from '../presentation/shared/desktop/SearchBar';

// Inline components
const Header = styled.div`
  height: 227px;
  width: 100%;
  background: ${props => props.theme.gradients.main};
`;

const Slim = props => {
  const { title, children } = props;

  return (
    <>
      <Header>
        <NavBar />
        <ViewTitle title={title} memberId="EVR123456789" groupId="123456" />
      </Header>
      <SearchBar />
      {children}
    </>
  );
};

Slim.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

Slim.defaultProps = {
  children: "You shouldn't be seeing this; layouts should always contain views."
};

export default Slim;
