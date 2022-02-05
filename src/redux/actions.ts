import {AnswerType, QuestionAnsData} from '../config/types';
import {
  RESET_USER,
  RESET_QUESTIONS,
  SET_IS_AUTHENTICATED,
  SET_USERNAME,
  SET_QUESTION_ANS_ARRAY,
  SET_ANSWER,
} from './constants';


//ACTIONS FOR QuesAnsReducer

export type SetQueAnsArrayActionType = {
  type: typeof SET_QUESTION_ANS_ARRAY;
  payload: QuestionAnsData[];
};

export const SetQueAnsArrayActionCreator = (
  queAnsArray: QuestionAnsData[],
): SetQueAnsArrayActionType => {
  return {
    type: SET_QUESTION_ANS_ARRAY,
    payload: queAnsArray,
  };
};
export type SetAnswerActionType = {
  type: typeof SET_ANSWER;
  payload: AnswerType;
};

export const SetAnswerActionCreator = (
  answerObj: AnswerType,
): SetAnswerActionType => {
  return {
    type: SET_ANSWER,
    payload: answerObj,
  };
};




//RESET ACTIONS

export type ResetActionType = {
  type: typeof RESET_QUESTIONS | typeof RESET_USER;
};

export const ResetQuestionsActionCreator = (): ResetActionType => {
  return {
    type: RESET_QUESTIONS,
  };
};

export const ResetUserActionCreator = (): ResetActionType => {
  return {
    type: RESET_USER,
  };
};


//ACTIONS for UserReducer

export type SetIsAuthenticatedActionType = {
  type: typeof SET_IS_AUTHENTICATED;
  payload: boolean;
};

export const SetIsAuthenticatedActionCreator = (
  isAuthenticated: boolean,
): SetIsAuthenticatedActionType => {
  return {
    type: SET_IS_AUTHENTICATED,
    payload: isAuthenticated,
  };
};

export type SetUserNameActionType = {
  type: typeof SET_USERNAME;
  payload: string;
};

export const SetUserNameActionCreator = (
  userName: string,
): SetUserNameActionType => {
  return {
    type: SET_USERNAME,
    payload: userName,
  };
};
