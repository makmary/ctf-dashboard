import { createBrowserHistory } from 'history';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { connectRouter, RouterState } from 'connected-react-router';
import { Reducer } from 'redux';
import { reducer as loginForm } from './features/login/@slice';
import { reducer as registerForm } from './features/register/@slice';
import { reducer as news } from './features/listOfNews/@slice';

export const history = createBrowserHistory();

const middleware = getDefaultMiddleware({ thunk: true });

const reducer = {
  router: connectRouter(history) as Reducer<RouterState>,
  loginForm,
  registerForm,
  news,
};

const store = configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

export type IRootState = ReturnType<typeof store.getState>;

export { store };
