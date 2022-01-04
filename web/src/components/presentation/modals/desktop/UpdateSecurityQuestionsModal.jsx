import React, { Component } from 'react';
import PropTypes from 'prop-types';
import defaultTheme from '../../../../style/themes';
import Select from '../../shared/desktop/Select';
import SmallButton from '../../shared/desktop/SmallButton';

// MODAL - Update Security Questions
// TODO: Add Options to question selects

const {
  FormLabel,
  Scrim,
  ModalBody,
  ModalButtonsRight,
  ModalHeader,
  Input,
  ModalSectionDivider,
  ModalTitle,
  ModalWrapper
} = defaultTheme.components;

class UpdateSecurityQuestionsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionOne: '',
      answerOne: '',
      questionTwo: '',
      answerTwo: ''
    };

    this.handlers = {
      handleChange: this.handleChange.bind(this)
    };
  }

  handleChange(event) {
    const stateObject = {};
    stateObject[event.target.name] = event.target.value;
    this.setState(stateObject);
  }

  render() {
    const { questionOne, answerOne, questionTwo, answerTwo } = this.state;
    const { hideModal } = this.props;

    return (
      <>
        <Scrim onClick={hideModal} />
        <ModalWrapper>
          <ModalHeader>
            <ModalTitle>Update Security Questions.</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <FormLabel>Question #1</FormLabel>
            <Select
              name="questionOne"
              placeholder="Choose a question"
              value={questionOne}
              onChange={this.handlers.handleChange}
            >
              {/* NEED OPTIONS */}
              <option>Question 1</option>
              <option>Question 2</option>
              <option>Question 3</option>
            </Select>
            <Input
              name="answerOne"
              type="text"
              placeholder="Enter your answer to question #1."
              value={answerOne}
              onChange={this.handlers.handleChange}
            />
            <FormLabel>Question #2</FormLabel>
            <Select
              name="questionTwo"
              placeholder="Choose a question"
              value={questionTwo}
              onChange={this.handlers.handleChange}
            >
              {/* NEED OPTIONS */}
              <option>Question 1</option>
              <option>Question 2</option>
              <option>Question 3</option>
            </Select>
            <Input
              name="answerTwo"
              type="text"
              placeholder="Enter your answer to question #2."
              value={answerTwo}
              onChange={this.handlers.handleChange}
            />
          </ModalBody>
          <ModalSectionDivider />
          <ModalButtonsRight>
            <SmallButton text="Submit Changes" />
            <SmallButton text="Cancel" negative onClick={hideModal} />
          </ModalButtonsRight>
        </ModalWrapper>
      </>
    );
  }
}

UpdateSecurityQuestionsModal.propTypes = {
  hideModal: PropTypes.func.isRequired
};

export default UpdateSecurityQuestionsModal;
