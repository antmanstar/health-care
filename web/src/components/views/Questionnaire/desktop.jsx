/* eslint no-shadow: ["error", { "allow": ["answer", "answers", "currentQuestion", "question", "saveQuestionnaire"] }] */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';
import cloneDeep from 'lodash/cloneDeep';
import { Sparse } from '../../layouts';
import OnboardingProgressBar from '../../presentation/registration/desktop/OnboardingProgressBar';
import OnboardingControls from '../../presentation/registration/desktop/OnboardingControls';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import history from '../../../utils/history';
import { Helmet } from 'react-helmet-async';
import moment from 'moment';
import StyledLoadingSpinner from '../../presentation/shared/Loader/StyledLoadingSpinner';

const { saveQuestionnaire } = actions;
const { getCarePlanSuggestion, getQuestionnaire, getToken, isQuestionnaireComplete, isSavingQuestionnaire } = selectors;

const Wrapper = styled.form`
  margin: 40px auto 80px;
  width: 960px;
  color: ${props => props.theme.colors.shades.blue};
  text-align: center;
`;

const Question = styled.h1`
  margin: 0 auto;
  text-align: center;
  width: 772px;
`;

const AnswerSet = styled.ol`
  list-style: none;
  margin: 40px auto 0;
  padding: 0;
  text-align: left;
  width: 452px;
`;

const Answer = styled.li`
  margin: 16px 0;

  &,
  & * {
    cursor: pointer;
  }

  & label {
    height: 32px;
    padding-left: 48px;
    position: relative;
    vertical-align: middle;
  }

  & label::before,
  & label::after {
    position: absolute;
  }
  & label::before {
    border: 1px solid #bbbcbc;
    box-sizing: border-box;
    border-radius: 4px;
    content: '';
    display: inline-block;
    height: 32px;
    left: 0;
    top: -10px;
    width: 32px;
    margin-right: 16px;
  }
  & label:hover::before,
  &.active label:hover::before {
    border-color: ${props => props.theme.colors.shades.pinkOrange};
  }
  &.active label::before {
    background-color: ${props => props.theme.colors.shades.pinkOrange};
    border: none;
  }

  & label::after {
    border-bottom: 3px solid white;
    border-left: 3px solid white;
    content: '';
    display: none;
    height: 8px;
    left: 9px;
    top: -2px;
    transform: rotate(-45deg);
    width: 12px;
  }
  &.active label::after {
    display: inline-block;
  }

  & input {
    display: none;
  }
`;

// ChooseCarePlan

class Questionnaire extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answers: [],
      currentQuestion: 1
    };
  }

  componentDidMount() {
    this.forwardToSuggestion();
  }

  componentDidUpdate() {
    this.forwardToSuggestion();
  }

  getCarePlanSuggestion() {
    const { carePlanSuggestion } = this.props;
    return carePlanSuggestion;
  }

  getAllAnswers() {
    const { answers } = this.state;
    return answers;
  }

  getAllQuestions() {
    const {
      questionnaire: { questions }
    } = this.props;
    return questions;
  }

  getCurrentQuestion() {
    const questions = this.getAllQuestions();
    const { currentQuestion } = this.state;
    return questions.find(question => question.question_order === currentQuestion);
  }

  forwardToSuggestion() {
    const { isQuestionnaireComplete } = this.props;
    const carePlanSuggestion = this.getCarePlanSuggestion();
    if (!isEmpty(carePlanSuggestion) || isQuestionnaireComplete) {
      history.push('/change-plan');
    }
  }

  areAllQuestionsAnswered() {
    const answers = this.getAllAnswers();
    const questions = this.getAllQuestions();
    return questions.reduce(
      (prev, question) =>
        prev && Boolean(answers.find(answer => question.question_id === answer.questionId)),
      true
    );
  }

  isQuestionAnswered() {
    const { currentQuestion } = this.state;
    let currentAnswer = undefined

    if (this.state.answers !== undefined)
      currentAnswer = this.state.answers[currentQuestion - 1]

    if (currentAnswer) {
      return true;
    }

    return false;
  }

  submitAnswers() {
    const { saveQuestionnaire } = this.props;
    const { answers } = this.state;
    const questionnaire = cloneDeep(this.props.questionnaire);

    answers.forEach(answer => {
      const question = questionnaire.questions.find(
        question => question.question_id === answer.questionId
      );
      const questionAnswer = question.question_selections.find(
        selection => selection.question_selection_id === answer.questionSelectionId
      );
      const questionPreviousAnswer = question.question_selections.find(
        selection => selection.question_selection_id !== answer.questionSelectionId
      );

      questionPreviousAnswer.question_selection_answer.length = 0;
      questionAnswer.question_selection_answer.length = 0;
      questionAnswer.question_selection_answer[0] = {
        name: null,
        question_selection_answer_id: 0,
        value: null,
        value_data_type: null
      };
    });

    questionnaire.completion_date_utc = moment.utc().format();

    saveQuestionnaire({ questionnaire });
  }

  render() {
    const { isSavingQuestionnaire } = this.props;
    const { currentQuestion } = this.state;
    const question = this.getCurrentQuestion();
    const answers = question.question_selections;
    const selectedAnswers = this.state.answers
      .filter(answer => answer.questionId === question.question_id)
      .map(answer => answer.questionSelectionId);

    return (
      <>
        <Helmet>
          <title>{reflection.layoutProps.title} - Evry Health</title>
        </Helmet>
        <OnboardingProgressBar progressStep={3} />
        <Wrapper>
          <Question>{question.question}</Question>
          <AnswerSet>
            {answers &&
              answers.map(answer => (
                <Answer
                  className={selectedAnswers.includes(answer.question_selection_id) ? 'active' : ''}
                  key={answer.question_selection_id}
                >
                  <label htmlFor={answer.question_selection_id}>
                    <input
                      type="checkbox"
                      id={answer.question_selection_id}
                      onClick={e => {
                        e.stopPropagation();
                        this.setState(prevState => {
                          const { answers } = prevState;
                          if (
                            !isEmpty(
                              answers.filter(
                                answerToTest =>
                                  answer.question_selection_id === answerToTest.questionSelectionId
                              )
                            )
                          ) {
                            return {
                              answers: [
                                ...answers.filter(
                                  answer => answer.questionId !== question.question_id
                                )
                              ]
                            };
                          }
                          return {
                            answers: [
                              ...answers.filter(
                                answer => answer.questionId !== question.question_id
                              ),
                              {
                                questionId: question.question_id,
                                questionSelectionId: answer.question_selection_id
                              }
                            ]
                          };
                        });
                      }}
                    />
                    {answer.selection}
                  </label>
                </Answer>
              ))}
          </AnswerSet>
          <OnboardingControls
            isQuestionAnswered={this.isQuestionAnswered()}
            currentStep={currentQuestion}
            maxSteps={this.props.questionnaire.questions.length}
            handleNextFunction={() => {
              this.setState((prevState, props) => {
                const { currentQuestion } = prevState;
                const newQuestion = currentQuestion + 1;
                const questions = this.getAllQuestions();

                if (newQuestion <= questions.length) {
                  return {
                    currentQuestion: newQuestion
                  };
                }

                if (this.areAllQuestionsAnswered()) {
                  this.submitAnswers();
                }

                return {};
              });
            }}
            handlePrevFunction={() => {
              this.setState(prevState => ({
                currentQuestion: prevState.currentQuestion - 1
              }));
            }}
          />
          {
            isSavingQuestionnaire && <StyledLoadingSpinner type="TailSpin" color="#00BFFF" />
          }
        </Wrapper>
      </>
    );
  }
}

Questionnaire.propTypes = {
  questionnaire: PropTypes.shape({
    questions: PropTypes.arrayOf(PropTypes.shape({}))
  }),
  saveQuestionnaire: PropTypes.func
};

Questionnaire.defaultProps = {
  questionnaire: {},
  isQuestionnaireComplete: false,
  saveQuestionnaire: () => { }
};

const mapStateToProps = state => ({
  carePlanSuggestion: getCarePlanSuggestion(state),
  questionnaire: getQuestionnaire(state),
  isQuestionnaireComplete: isQuestionnaireComplete(state),
  isSavingQuestionnaire: isSavingQuestionnaire(state),
  token: getToken(state)
});

const mapDispatchToProps = dispatch => ({
  saveQuestionnaire: args => dispatch(saveQuestionnaire(args))
});

const mergeProps = ({ token, ...stateProps }, { saveQuestionnaire }, ownProps) => ({
  saveQuestionnaire: ({ questionnaire }) =>
    saveQuestionnaire({
      questionnaire,
      token
    }),
  ...stateProps,
  ...ownProps
});

const ConnectedQuestionnaire = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Questionnaire);

const reflection = {
  component: ConnectedQuestionnaire,
  layout: Sparse,
  layoutProps: {
    title: "Let's get some info",
    subtitle: 'These questions will help us set up your plan and provide better curated service.',
    fullWidth: true
  },
  route: '/care-plan-questions'
};

export default Questionnaire;

export { reflection };
