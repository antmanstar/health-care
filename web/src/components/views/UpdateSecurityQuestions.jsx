import React, { Component } from 'react';
import styled from 'styled-components';
import { Mobile } from '../layouts';
import defaultTheme from '../../style/themes';
import MobileActionButton from '../presentation/shared/mobile/MobileActionButton';
import Select from '../presentation/shared/desktop/Select';

// MOBILE: Update Security Questions
// TODO: Need Question Options + Form Submission

const {
  MobileContentWrapper,
  MobileFixedBottomButton,
  MobileInput,
  MobileListTitle
} = defaultTheme.components;

const EditedMobileContentWrapper = styled(MobileContentWrapper)`
  padding-top: 48px;
`;

const SelectWrapper = styled.div`
  margin-bottom: 8px;
`;

class UpdateSecurityQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionOne: '',
      answerOne: '',
      questionTwo: '',
      answerTwo: '',
      changesMade: false
    };

    this.handlers = {
      handleChange: this.handleChange.bind(this)
    };
  }

  handleChange(event) {
    const stateObject = {};
    stateObject[event.target.name] = event.target.value;
    this.setState(stateObject);

    this.setState({ changesMade: true });
  }

  render() {
    const { questionOne, answerOne, questionTwo, answerTwo, changesMade } = this.state;

    return (
      <>
        <EditedMobileContentWrapper>
          <MobileListTitle>Question #1</MobileListTitle>
          <SelectWrapper>
            <Select
              name="questionOne"
              placeholder="Choose a question"
              value={questionOne}
              onChange={this.handlers.handleChange}
              mobile
            >
              {/* NEED OPTIONS */}
              <option>Question 1</option>
              <option>Question 2</option>
              <option>Question 3</option>
            </Select>
          </SelectWrapper>
          <MobileInput
            name="answerOne"
            type="text"
            placeholder="Enter your answer to question #1."
            value={answerOne}
            onChange={this.handlers.handleChange}
          />
          <MobileListTitle>Question #2</MobileListTitle>
          <SelectWrapper>
            <Select
              name="questionTwo"
              placeholder="Choose a question"
              value={questionTwo}
              onChange={this.handlers.handleChange}
              mobile
            >
              {/* NEED OPTIONS */}
              <option>Question 1</option>
              <option>Question 2</option>
              <option>Question 3</option>
            </Select>
          </SelectWrapper>
          <MobileInput
            name="answerTwo"
            type="text"
            placeholder="Enter your answer to question #2."
            value={answerTwo}
            onChange={this.handlers.handleChange}
          />
        </EditedMobileContentWrapper>
        {changesMade && (
          <MobileFixedBottomButton>
            <MobileActionButton type="action" text="Submit Changes" />
          </MobileFixedBottomButton>
        )}
      </>
    );
  }
}

const reflection = {
  component: UpdateSecurityQuestions,
  layout: Mobile,
  layoutProps: {
    titleWrapperClass: 'none',
    navProps: {
      left: 'back',
      title: 'Update Security Questions',
      permanentTitle: true,
      permanentBg: true
    }
  },
  route: '/update-security-questions',
  forAuthorized: true
};

export default UpdateSecurityQuestions;

export { reflection };
