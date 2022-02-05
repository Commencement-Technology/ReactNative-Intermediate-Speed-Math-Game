import {UserInitialStateType} from '../../config/types';
import {
  ResetActionType,
  SetIsAuthenticatedActionType,
  SetUserNameActionType,
} from '../actions';
import { RESET_USER, SET_IS_AUTHENTICATED, SET_USERNAME} from '../constants';

const userInitialState: UserInitialStateType = {
  isAuthenticated: false,
  userName: '',
};

type UserActionType =
  | SetIsAuthenticatedActionType
  | SetUserNameActionType
  | ResetActionType;

export const userReducer = (
  state: UserInitialStateType = userInitialState,
  action: UserActionType,
) => {
  switch (action.type) {
    case SET_IS_AUTHENTICATED:
      return {...state, isAuthenticated: action.payload};
    case SET_USERNAME:
      return {...state, userName: action.payload};
    case RESET_USER:
      return userInitialState;
    default: {
      return state;
    }
  }
};
