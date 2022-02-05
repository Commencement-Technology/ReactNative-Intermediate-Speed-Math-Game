import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {createStore} from 'redux';

import RootReducer from './reducers/RootReducer';
import {RootState} from './reducers/RootReducer';

export const store = createStore(RootReducer);

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
