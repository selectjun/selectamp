import { combineReducers } from 'redux';
import config from './config';

const rootReducer = combineReducers({
  config
});

export default rootReducer;

export type RootStateType = ReturnType<typeof rootReducer>;