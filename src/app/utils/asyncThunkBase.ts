import { createAsyncThunk } from '@reduxjs/toolkit';
import HttpStatusCodes from 'http-status-codes';
import { Intent } from '@blueprintjs/core';
import { IFetchResponse } from './api';
import { IResult } from './response/IResponse';
import { IAsyncError } from './response/IAsyncError';
import CTFToaster from '../components/CTFToaster/CTFToaster';

const getErrorText = (statusCode: number) => {
  if (statusCode === HttpStatusCodes.BAD_REQUEST) {
    CTFToaster.show({
      message: 'Проверьте правильность введенных данных',
      intent: Intent.DANGER,
      icon: 'warning-sign',
    });
    return 'Проверьте правильность введенных данных';
  }
  CTFToaster.show({ message: 'Произошла неизвестная ошибка', intent: Intent.DANGER, icon: 'warning-sign' });
  return 'Произошла неизвестная ошибка';
};

const asyncThunkBase = <RS, RQ = undefined>(prefix: string, method: (request: RQ) => Promise<IFetchResponse<RS>>) =>
  createAsyncThunk<IResult<RS>, RQ, { rejectValue: IAsyncError }>(prefix, async (request: RQ, thunkAPI) => {
    try {
      const response = await method(request);

      const data = await response.json();
      const action = data.result;

      if (response.status === HttpStatusCodes.OK || response.status === HttpStatusCodes.CREATED) {
        CTFToaster.show({ message: 'Действие прошло успешно', intent: Intent.SUCCESS, icon: 'tick' });
        return action;
      }

      const errorAction: IAsyncError = {
        error: getErrorText(response.status),
      };

      return thunkAPI.rejectWithValue(errorAction);
    } catch (e) {
      const errorAction: IAsyncError = {
        error: 'Произошла неизвестная ошибка',
      };
      CTFToaster.show({ message: 'Произошла неизвестная ошибка', intent: Intent.DANGER, icon: 'warning-sign' });

      return thunkAPI.rejectWithValue(errorAction);
    }
  });

export default asyncThunkBase;
