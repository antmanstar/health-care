import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-left: 1px solid #A6CB88;
  background-color: #E4FCD1;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  max-width: 550px;
  margin: 0 auto;

  transition: opacity 0.25s;
  opacity: ${props => props.opacity};
  display: ${props => props.display};
`;

const Header = styled.div`
  font-weight: 500;
`;

const Close = styled.div`
  position: absolute;
  right: 10px;
  top: 2px;
  font-size: 28px;
  font-weight: 500;
  opacity: 0.2;
  cursor: pointer;
`;

export default function MessageAlert(props) {
  const [ closed, setClosed ] = useState(false);
  const [ none, setNone ] = useState(false);

  function closeAlert(){
    setClosed(true);

    setTimeout(() => { setNone(true); }, 250);
  }

  return (
    <Container opacity={closed ? 0 : 1} display={none ? "none" : "block"}>
      <Close onClick={closeAlert}>×</Close>
      <Header>Success!</Header>
      <div>{props.children}</div>
    </Container>
  )
}