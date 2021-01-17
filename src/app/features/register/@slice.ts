import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import HttpStatusCodes from 'http-status-codes';
import { Intent } from '@blueprintjs/core';
import { IRootState } from '../../store';
import { fetchMain, Routes } from '../../utils/api';
import { IAsyncError } from '../../utils/response/IAsyncError';
import CTFToaster from '../../components/CTFToaster/CTFToaster';
import { IRegisterRequest } from '../../utils/request/IRegisterRequest';

interface ISliceState {
  error?: string;
  isProgress: boolean;
}

export const fetchRegister = createAsyncThunk('register/register', async (register: IRegisterRequest, thunkAPI) => {
  try {
    const response = await fetchMain(Routes.REGISTER, {
      method: 'POST',
      body: JSON.stringify(register),
    });
    const data: any = await response.json();
    if (response.status === HttpStatusCodes.OK || response.status === HttpStatusCodes.CREATED) {
      CTFToaster.show({ message: 'Регистрация прошла успешно', intent: Intent.SUCCESS, icon: 'tick' });
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
  name: 'register',
  initialState: {
    error: '',
    isProgress: false,
  } as ISliceState,
  reducers: {},
  extraReducers: {
    [fetchRegister.pending.type]: (state) => {
      state.isProgress = true;
    },
    [fetchRegister.fulfilled.type]: (state) => {
      state.error = '';
      state.isProgress = false;
    },
    [fetchRegister.rejected.type]: (state, action: PayloadAction<IAsyncError>) => {
      state.error = action.payload.error;
      state.isProgress = false;
    },
  },
});

export const selectors = {
  errorSelector: (state: IRootState) => state.registerForm.error,
  isProgressSelector: (state: IRootState) => state.registerForm.isProgress,
};
