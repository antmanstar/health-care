import React from 'react';
import styled from 'styled-components';

const PopOverContent = styled.div`
  width: max-content;
  opacity: 0;
  visibility: hidden;
  position: absolute;
  top: ${props => (props.top ? props.top : '-45px')};
  background-color: white;
  padding: 0.7rem;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
  border-radius: 3px;
`;

const PopOverDetail = styled.div`
  span {
    font-weight: bold;
  }
`;

const PopOverWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  &:hover {
    ${PopOverContent} {
      z-index: 10;
      opacity: 1;
      visibility: visible;
      transform: translate(0, -20px);
      transition: all 0.25s cubic-bezier(0.75, -0.02, 0.2, 0.97);
    }
  }
`;

export const PopOver = ({ content, top, children }) => (
  <PopOverWrapper>
    <PopOverContent top={top}>
      <PopOverDetail>{content}</PopOverDetail>
    </PopOverContent>
    {children}
  </PopOverWrapper>
);
