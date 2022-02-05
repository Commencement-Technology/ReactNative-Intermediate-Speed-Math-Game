export type QuestionAnsData = {
  questionId: number;
  question: string;
  originalAnswer: string;
  answerOfStudent: string;
};

export type TextFieldType = {
  value: string;
  error: boolean;
  errorMessage: string;
};

export type UserInitialStateType = {
  isAuthenticated: boolean;
  userName: string;
};

export type AnswerType = {
  id: number;
  answerOfStudent: string;
};

export type ApiResponseType= {
  answer: string;
  created_at: string;
  game_level_id: number;
  id: number;
  question: string;
  updated_at: string;
};
