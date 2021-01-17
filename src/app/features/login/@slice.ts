import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import HttpStatusCodes from 'http-status-codes';
import { Intent } from '@blueprintjs/core';
import { IRootState } from '../../store';
import { IAsyncError } from '../../utils/response/IAsyncError';
import { IResponse } from '../../utils/response/IResponse';
import { IToken } from '../../utils/response/IToken';
import { fetchMain, Routes } from '../../utils/api';
import { ILoginRequest } from '../../utils/request/ILoginRequest';
import CTFToaster from '../../components/CTFToaster/CTFToaster';

interface ISliceState {
  token?: string;
  error?: string;
  isProgress: boolean;
}

export const fetchLogin = createAsyncThunk('login/login', async (login: ILoginRequest, thunkAPI) => {
  try {
    const response = await fetchMain<IResponse<IToken>>(Routes.LOGIN, {
      method: 'POST',
      body: JSON.stringify(login),
    });
    const data: any = await response.json();
    if (response.status === HttpStatusCodes.OK || response.status === HttpStatusCodes.CREATED) {
      CTFToaster.show({ message: 'Авторизация прошла успешно', intent: Intent.SUCCESS, icon: 'tick' });
      return data;
    }

    if (response.status === HttpStatusCodes.BAD_REQUEST) {
      CTFToaster.show({
        message: 'Проверьте правильность введенных данных',
        intent: Intent.DANGER,
        icon: 'warning-sign',
      });
    }

    CTFToaster.show({ message: 'Произошла неизвестная ошибка', intent: Intent.DANGER, icon: 'warning-sign' });
    return null;
  } catch (e) {
    const errorAction: IAsyncError = {
      error: 'Произошла неизвестная ошибка',
    };
    CTFToaster.show({ message: 'Произошла неизвестная ошибка', intent: Intent.DANGER, icon: 'warning-sign' });

    return thunkAPI.rejectWithValue(errorAction);
  }
});

export const { actions, reducer } = createSlice({
  name: 'login',
  initialState: {
    error: '',
    token: '',
    isProgress: false,
  } as ISliceState,
  reducers: {
    resetError: (state) => {
      state.error = '';
    },
  },
  extraReducers: {
    [fetchLogin.pending.type]: (state) => {
      state.isProgress = true;
    },
    [fetchLogin.fulfilled.type]: (state, action: PayloadAction<IToken>) => {
      state.token = action.payload.access_token;
      state.isProgress = false;
    },
    [fetchLogin.rejected.type]: (state, action: PayloadAction<IAsyncError>) => {
      state.error = action.payload.error;
      state.isProgress = false;
    },
  },
});

export const selectors = {
  isProgressSelector: (state: IRootState) => state.loginForm.isProgress,
  errorSelector: (state: IRootState) => state.loginForm.error,
  tokenSelector: (state: IRootState) => state.loginForm.token,
};
