import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../../shared/desktop/Button';
import NegativeButton from '../../shared/desktop/NegativeButton';
import ErrorMessage from '../../shared/desktop/ErrorMessage';

// This the high level component for User Registration Form
// Styles for 2 versions (with / without desc) of form inputs from the registration views are in here.

const Wrapper = styled.div`
  margin: 40px auto 0;
  width: 960px;
  color: ${props => props.theme.colors.shades.blue};
`;

const Form = styled.div`
  margin-bottom: 32px;
  padding: 32px 0;
  border-top: 1px solid ${props => props.theme.colors.shades.nearlyWhite};
  border-bottom: 1px solid ${props => props.theme.colors.shades.nearlyWhite};
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 8px;
  }
`;

const Col = styled.div`
  width: 464px;
`;

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1,
  h3,
  p {
    margin: 0;
  }
`;

const TogglePasswordShow = styled.p`
  margin: 0;
  font-size: 14px;
  font-style: italic;
  color: ${props => props.theme.colors.shades.gray};
  cursor: pointer;
`;

const Title = styled.h1`
  margin: 0 0 16px 0;
  font-size: 24px;
  font-weight: 400;
`;

const LabelWrapper = styled.div`
  margin: 0 0 16px 0;
`;

const LabelTitle = styled.h3`
  display: flex;
  margin: 0 0 8px 0;
  font-weight: 500;
  font-size: 16px;
`;

const TextInput = styled.input`
  width: 100%;
  padding: 0 16px;
  font-weight: 300;
  font-size: 16px;
  line-height: 48px;
  background: ${props => props.theme.colors.shades.nearlyWhite};
  color: ${props => props.theme.colors.shades.blue};
  border-radius: 4px;
  border: 1px solid transparent;
  box-sizing: border-box;

  ::placeholder {
    color: #bbbcbc;
  }

  &:focus {
    outline: none;
    border-color: #bbbcbc;
  }
`;

const Buttons = styled.div`
  width: 100%;
  text-align: center;

  > * {
    margin-bottom: 8px;
  }
`;

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Wrapper>
        <Title>Find your membership.</Title>
        <Form>
          <ErrorMessage />
          <Row>
            <Col>
              <LabelWrapper>
                <LabelTitle>First Name</LabelTitle>
              </LabelWrapper>
              <TextInput placeholder="Example: EVR19238400032" />
            </Col>
            <Col>
              <LabelWrapper>
                <LabelTitle>Last Name</LabelTitle>
              </LabelWrapper>
              <TextInput placeholder="****" />
            </Col>
          </Row>
          <Row>
            <Col>
              <LabelWrapper>
                <LabelTitle>Email Address</LabelTitle>
              </LabelWrapper>
              <TextInput placeholder="Example: EVR19238400032" />
            </Col>
            <Col>
              <LabelWrapper>
                <SpaceBetween>
                  <LabelTitle>Choose a Password</LabelTitle>
                  <TogglePasswordShow>show password</TogglePasswordShow>
                </SpaceBetween>
              </LabelWrapper>
              <TextInput placeholder="****" />
            </Col>
          </Row>
        </Form>
        <Buttons>
          <Button text="Confirm Membership" />
          <br />
          <NegativeButton text="Cancel" />
        </Buttons>
      </Wrapper>
    );
  }
}

export default RegistrationForm;
