import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// MODAL - Modal Multiple Choice Question

const Container = styled.div`
  padding: 16px 0;
  font-size: 16px;
  font-weight: 300;
  color: ${props => props.theme.colors.shades.blue};

  p {
    margin: 0;
  }
`;
const Answers = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0 0;
  color: ${props => props.theme.colors.shades.darkGray};
`;

const ChoiceWrapper = styled.button`
  display: flex;
  align-items: center;
  margin-left: 16px;
  font-weight: 300;
  background: ${props => props.theme.colors.shades.white};
  color: ${props => props.theme.colors.shades.darkGray};
  border: none;
  outline: none;

  &:first-child {
    margin-left: 0;
  }

  &:hover {
    cursor: pointer;
  }
`;

const CircleOuter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
  width: 24px;
  margin-right: 8px;
  border: 1px solid ${props => props.theme.colors.shades.mediumGray};
  border-radius: 50%;

  div {
    height: 14px;
    width: 14px;
    border-radius: 50%;
    background: ${props =>
      props.checked ? props.theme.colors.shades.pinkOrange : props.theme.colors.shades.white};
  }

  ${ChoiceWrapper}:hover & {
    border: 1px solid ${props => props.theme.colors.shades.darkGray};
  }
`;

const ModalMultipleChoiceQuestion = React.memo(
  ({ question, answers, chosenAnswer, handleAnswerClick }) => (
    <Container>
      <p>{question}</p>
      <Answers>
        {answers.map((item, index) => (
          <ChoiceWrapper key={item.toString()} onClick={() => handleAnswerClick(item.toString())}>
            <CircleOuter checked={item === chosenAnswer}>
              <div />
            </CircleOuter>
            <p>{item}</p>
          </ChoiceWrapper>
        ))}
      </Answers>
    </Container>
  )
);

ModalMultipleChoiceQuestion.propTypes = {
  question: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleAnswerClick: PropTypes.func.isRequired,
  chosenAnswer: PropTypes.string
};

ModalMultipleChoiceQuestion.defaultProps = {
  chosenAnswer: null
};

export default ModalMultipleChoiceQuestion;
