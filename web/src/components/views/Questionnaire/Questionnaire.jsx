import React, { useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
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
import LoadingSpinnerScreen from '../../presentation/shared/Loader/LoadingSpinnerScreen';
import { useEffect } from 'react';

const { saveQuestionnaire } = actions;
const {
  getCarePlanSuggestion,
  getQuestionnaire,
  getToken,
  isQuestionnaireComplete,
  isSavingQuestionnaire,
  isAuthenticated
} = selectors;

const Wrapper = styled.form`
  margin: 40px auto 0px;
  width: 100%;
  color: ${props => props.theme.colors.shades.blue};
  text-align: center;

  @media ${props => props.theme.device.mobile} {
    width: 100%;
  }

  @media ${props => props.theme.device.tablet} {
    width: 100%;
  }

  @media ${props => props.theme.device.tabletXL} {
    width: 100%;
  }

  @media ${props => props.theme.device.desktop} {
    width: 960px;
  }

  @media ${props => props.theme.device.desktopXL} {
    width: 960px;
  }
`;

const Question = styled.h1`
  margin: 0 auto;
  text-align: center;
  width: 100%;

  @media ${props => props.theme.device.mobile} {
    width: 100%;
  }

  @media ${props => props.theme.device.tablet} {
    width: 100%;
  }

  @media ${props => props.theme.device.tabletXL} {
    width: 100%;
  }

  @media ${props => props.theme.device.desktop} {
    width: 772px;
  }

  @media ${props => props.theme.device.desktopXL} {
    width: 772px;
  }
`;

const AnswerWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const AnswerSet = styled.ol`
  list-style: none;
  margin: 40px auto 0;
  padding: 0;
  text-align: left;
  display: flex;
  justify-content: space-around;
  width: 100%;

  @media ${props => props.theme.device.mobile} {
    width: 100%;
    margin: 60px 0 60px 0;
    justify-content: space-around;
  }

  @media ${props => props.theme.device.tablet} {
    width: 100%;
    margin: 70px 0 70px 0;
    justify-content: space-around;
  }

  @media ${props => props.theme.device.tabletXL} {
    width: 100%;
    margin: 70px 0 70px 0;
    justify-content: space-around;
  }

  @media ${props => props.theme.device.desktop} {
    width: 100%;
    margin-bottom: 110px;
    justify-content: space-evenly;
  }

  @media ${props => props.theme.device.desktopXL} {
    width: 100%;
    margin-bottom: 110px;
    justify-content: space-evenly;
  }
`;

const Answer = styled.div`
  margin: 16px 0;
  display: flex;
  justify-content: center;
  align-items: center;

  border: 0px solid #bbbcbc;
  box-sizing: border-box;
  background: #f4f4f4;
  border-radius: 4px;
  height: 48px;
  width: 128px;

  cursor: pointer;

  & label {
    cursor: pointer !important;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    display: flex;

    &.active {
      color: white;
    }

    caret-color: rgba(0, 0, 0, 0);
  }

  &.active {
    background: ${props => props.theme.colors.shades.pinkOrange};
    border: none;
  }

  & input {
    display: none;
  }
`;

const InputWrapper = styled.div`
  background: #f4f4f4;
  border-radius: 4px;
`;

const OnboardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

const Questionnaire = () => {
  // states
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const dispatch = useDispatch();

  // selectors
  const carePlanSuggestion = useSelector(getCarePlanSuggestion);
  const questionnaire = useSelector(getQuestionnaire);
  const isQuestionnaireCompleted = useSelector(isQuestionnaireComplete);
  const isSavingQuestion = useSelector(isSavingQuestionnaire);
  const token = useSelector(getToken);

  const authenticated = useSelector(isAuthenticated);

  // dispatch
  const saveResult = sv_data => dispatch(saveQuestionnaire(sv_data));

  // constants
  const questions = questionnaire?.questions;
  if (!questions) {
    return <Redirect to="/" />;
  }

  const current_question = questions.find(
    question => question.question_order === currentQuestionIndex
  );
  const answers = current_question.question_selections;
  const selectedAnswers = userAnswers
    .filter(answer => answer.questionId === current_question.question_id)
    .map(answer => answer.questionSelectionId);

  useEffect(() => {
    if (!authenticated) {
      history.push('/sign-in');
    }
  }, []);
  useEffect(() => {
    if (!isEmpty(carePlanSuggestion) || isQuestionnaireCompleted) {
      history.push('/change-plan');
    }
  }, [isSavingQuestion]);

  const areAllQuestionsAnswered = () => {
    return questions.reduce(
      (prev, question) =>
        prev &&
        Boolean(userAnswers.find(userAnswer => question.question_id === userAnswer.questionId)),
      true
    );
  };

  const isQuestionAnswered = () => {
    return userAnswers && userAnswers[currentQuestionIndex - 1] ? true : false;
  };

  const submitAnswers = () => {
    const sv_questionnaire = cloneDeep(questionnaire);

    userAnswers.forEach(userAnswer => {
      // question
      const question = sv_questionnaire.questions.find(
        question => question.question_id === userAnswer.questionId
      );

      // question answer
      const questionAnswer = question.question_selections.find(
        selection => selection.question_selection_id === userAnswer.questionSelectionId
      );

      // prev question answer
      const questionPreviousAnswer = question.question_selections.find(
        selection => selection.question_selection_id !== userAnswer.questionSelectionId
      );

      // set changes
      questionPreviousAnswer.question_selection_answer.length = 0;
      questionAnswer.question_selection_answer.length = 0;
      questionAnswer.question_selection_answer[0] = {
        name: null,
        question_selection_answer_id: 0,
        value: null,
        value_data_type: null
      };
    });

    // adding timestamp to new one
    sv_questionnaire.completion_date_utc = moment.utc().format();

    // save new one
    saveResult({ questionnaire: sv_questionnaire, token });
  };

  // handlers
  const handleNextFunction = () => {
    const newIndex = currentQuestionIndex + 1;
    if (areAllQuestionsAnswered()) {
      submitAnswers();
      setCurrentQuestionIndex(1);
    } else {
      newIndex <= questions.length
        ? setCurrentQuestionIndex(newIndex)
        : setCurrentQuestionIndex(currentQuestionIndex);
    }
  };

  const handlePrevFunction = () => {
    const newIndex = currentQuestionIndex - 1;
    newIndex != 0 ? setCurrentQuestionIndex(newIndex) : setCurrentQuestionIndex(1);
  };

  const handleClick = (e, answer) => {
    e.stopPropagation();
    const filtered = userAnswers.filter(
      userAnswer => answer.question_selection_id === userAnswer.questionSelectionId
    );
    !isEmpty(filtered)
      ? setUserAnswers([
          ...userAnswers.filter(
            userAnswer => userAnswer.questionId !== current_question.question_id
          )
        ])
      : setUserAnswers([
          ...userAnswers.filter(
            userAnswer => userAnswer.questionId !== current_question.question_id
          ),
          {
            questionId: current_question.question_id,
            questionSelectionId: answer.question_selection_id
          }
        ]);
  };

  return (
    <>
      <Helmet>
        <title>{reflection.layoutProps.title} - Evry Health</title>
      </Helmet>
      <OnboardingProgressBar progressStep={3} />
      <Wrapper>
        <Question>{current_question.question}</Question>
        <AnswerWrapper>
          <AnswerSet>
            {answers &&
              answers.map(answer => (
                <Answer
                  className={selectedAnswers.includes(answer.question_selection_id) ? 'active' : ''}
                  key={answer.question_selection_id}
                >
                  <label
                    className={
                      selectedAnswers.includes(answer.question_selection_id) ? 'active' : ''
                    }
                    htmlFor={answer.question_selection_id}
                  >
                    <InputWrapper>
                      <input
                        type="checkbox"
                        id={answer.question_selection_id}
                        onClick={e => handleClick(e, answer)}
                      />
                    </InputWrapper>
                    {answer.selection}
                  </label>
                </Answer>
              ))}
          </AnswerSet>
        </AnswerWrapper>
      </Wrapper>
      <OnboardWrapper>
        <OnboardingControls
          isSavingQuestionnaire={isSavingQuestion}
          isQuestionAnswered={isQuestionAnswered()}
          currentStep={currentQuestionIndex}
          maxSteps={questions.length}
          handleNextFunction={handleNextFunction}
          handlePrevFunction={handlePrevFunction}
        />
        {isSavingQuestion && <LoadingSpinnerScreen type="TailSpin" color="#00BFFF" />}
      </OnboardWrapper>
    </>
  );
};

Questionnaire.propTypes = {
  questionnaire: PropTypes.shape({
    questions: PropTypes.arrayOf(PropTypes.shape({}))
  }),
  saveResult: PropTypes.func
};

Questionnaire.defaultProps = {
  questionnaire: {},
  isQuestionnaireCompleted: false,
  saveResult: () => {}
};

const reflection = {
  component: Questionnaire,
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
