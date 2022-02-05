import {QuestionAnsData} from '../../config/types';
import {
  ResetActionType,
  SetAnswerActionType,
  SetQueAnsArrayActionType,
} from '../actions';
import {
  SET_QUESTION_ANS_ARRAY,
  RESET_QUESTIONS,
  SET_ANSWER,
} from '../constants';

const questionAnsInitialState: QuestionAnsData[] = [];

type QuestionAnsActionType =
  | SetQueAnsArrayActionType
  | SetAnswerActionType
  | ResetActionType;

export const questionAnsReducer = (
  state: QuestionAnsData[] = questionAnsInitialState,
  action: QuestionAnsActionType,
) => {
  switch (action.type) {
    case SET_QUESTION_ANS_ARRAY: {
      state = [];
      return [...action.payload];
    }
    case SET_ANSWER: {
      let newState = state.map(obj => {
        if (obj.questionId === action.payload.id)
          return {
            ...obj,
            answerOfStudent: action.payload.answerOfStudent,
          };
        return obj;
      });
      return [...newState];
    }
    case RESET_QUESTIONS:
      return questionAnsInitialState;
    default: {
      return state;
    }
  }
};
