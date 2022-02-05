import {combineReducers} from 'redux';
import {questionAnsReducer} from './QuestionAnsReducer';
import {userReducer} from './UserReducer'

const RootReducer = combineReducers({
  questionAnswer: questionAnsReducer,
  user:userReducer
});
export type RootState = ReturnType<typeof RootReducer>;
export default RootReducer;
