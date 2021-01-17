import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import HttpStatusCodes from 'http-status-codes';
import { Intent } from '@blueprintjs/core';
import { fetchMain, Routes } from '../../utils/api';
import { IAsyncError } from '../../utils/response/IAsyncError';
import { IRootState } from '../../store';
import FetchStatus from '../../common/enums/FetchStatus';
import { INewsResponse } from '../../utils/response/INewsResponse';
import { IResponse } from '../../utils/response/IResponse';
import CTFToaster from '../../components/CTFToaster/CTFToaster';

interface ISliceState {
  data: INewsResponse[];
  fetchStatus: FetchStatus;
  error?: string;
}

export const fetchNewsList = createAsyncThunk('news/list', async ({}, thunkAPI) => {
  try {
    const response = await fetchMain<IResponse<INewsResponse[]>>(Routes.GET_ALL_NEWS, {
      method: 'GET',
    });
    const data: any = await response.json();
    if (response.status === HttpStatusCodes.OK || response.status === HttpStatusCodes.CREATED) {
      return data;
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
  name: 'allNews',
  initialState: {
    data: [],
    fetchStatus: FetchStatus.NONE,
    error: '',
  } as ISliceState,
  reducers: {},
  extraReducers: {
    [fetchNewsList.pending.type]: (state) => {
      state.fetchStatus = FetchStatus.IN_PROGRESS;
    },
    [fetchNewsList.fulfilled.type]: (state, action: PayloadAction<INewsResponse[]>) => {
      state.data = action.payload;
      state.error = '';
      state.fetchStatus = FetchStatus.SUCCESS;
    },
    [fetchNewsList.rejected.type]: (state, action: PayloadAction<IAsyncError>) => {
      state.error = action.payload.error;
      state.fetchStatus = FetchStatus.FAILED;
    },
  },
});

export const selectors = {
  dataSelector: (state: IRootState) => state.news.data,
  fetchStatusSelector: (state: IRootState) => state.news.fetchStatus,
  errorSelector: (state: IRootState) => state.news.error,
};
