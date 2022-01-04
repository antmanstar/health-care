import React from 'react';
import styled from 'styled-components';

// MOBILE - Get Started Button

const Wrapper = styled.button`
  width: 100%;
  padding: 0 16px;
  text-align: left;
  background: ${props => props.theme.colors.roles.success};
  color: ${props => props.theme.colors.shades.white};
  border: none;
  outline: none;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 16px;

  svg {
    margin-right: 16px;
    height: 40px;
  }

  i {
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  }
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 500;
  margin: 0 0 4px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 13px;
  font-weight: 400;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
`;

const GetStartedButton = React.memo(() => (
  <Wrapper>
    <Container>
      <LeftSide>
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="20" cy="20" r="18.5" stroke="#fff" strokeWidth="3" />
          <path
            d="M20.3067 18.5333C17.28 17.7467 16.3067 16.9333 16.3067 15.6667C16.3067 14.2133 17.6533 13.2 19.9067 13.2C22.28 13.2 23.16 14.3333 23.24 16H26.1867C26.0933 13.7067 24.6933 11.6 21.9067 10.92V8H17.9067V10.88C15.32 11.44 13.24 13.12 13.24 15.6933C13.24 18.7733 15.7867 20.3067 19.5067 21.2C22.84 22 23.5067 23.1733 23.5067 24.4133C23.5067 25.3333 22.8533 26.8 19.9067 26.8C17.16 26.8 16.08 25.5733 15.9333 24H13C13.16 26.92 15.3467 28.56 17.9067 29.1067V32H21.9067V29.1333C24.5067 28.64 26.5733 27.1333 26.5733 24.4C26.5733 20.6133 23.3333 19.32 20.3067 18.5333Z"
            fill="#fff"
          />
        </svg>
        <div>
          <Title>Get Started, Earn Cash.</Title>
          <Subtitle>Get paid to learn about your benefits.</Subtitle>
        </div>
      </LeftSide>
      <i className="material-icons">keyboard_arrow_right</i>
    </Container>
  </Wrapper>
));

export default GetStartedButton;
