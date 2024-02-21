import {createSlice} from '@reduxjs/toolkit';
import store from '..';
import {MMKVLoader} from 'react-native-mmkv-storage';

const mmkv = new MMKVLoader().initialize();

type RootState = ReturnType<typeof store.getState>;

type GoalData = {
  steps: number;
  water: number;
};

type DailyData = {
  [date: string]: GoalData;
};

type DailyGoalAction = {
  type: string;
  payload: {
    date: string;
    data: Partial<GoalData>;
  };
};

type AddDataAction = {
  type: string;
  payload: {
    date?: string;
    data: number;
  };
};

const initialState = {
  dailyData: {} as DailyData,
  weeklyGoals: {
    steps: 12000,
    water: 12000,
  } as GoalData,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setWeeklyGoals: (state, action) => {
      state.weeklyGoals = action.payload;
      mmkv.setMap('data', state);
    },
    setDailyData: (state, action: DailyGoalAction) => {
      state.dailyData[action.payload.date] = {
        ...state.dailyData[action.payload.date],
        ...action.payload.data,
      };
      mmkv.setMap('data', state);
    },
    addSteps: (state, action: AddDataAction) => {
      const date =
        action.payload.date || new Date().toISOString().split('T')[0];
      if (!state.dailyData[date]) {
        // If there is no data for today, create a new entry
        state.dailyData[date] = {
          steps: 0,
          water: 0,
        };
      }
      state.dailyData[date].steps += action.payload.data;
    },
    addWater: (state, action: AddDataAction) => {
      const date =
        action.payload.date || new Date().toISOString().split('T')[0];
      state.dailyData[date].water += action.payload.data;
      mmkv.setMap('data', state);
    },
    saveData: state => {
      console.debug('Data Saved to localstorage', state);
      mmkv.setMap('data', state);
    },
    loadData: state => {
      console.debug('Data Loaded from localstorage');
      const data = mmkv.getMap('data') as typeof initialState;
      if (data) {
        state.weeklyGoals = data.weeklyGoals;
        state.dailyData = data.dailyData;
      }
    },
  },
});

export const {
  setWeeklyGoals,
  setDailyData,
  addSteps,
  addWater,
  saveData,
  loadData,
} = dataSlice.actions;

export const selectWeeklyGoals = (state: RootState) => state.data.weeklyGoals;

export const selectDailyData = (date: string) => (state: RootState) => {
  console.log(state);
  return state.data.dailyData[date];
};

export const selectAllDailyData = (state: RootState) => state.data.dailyData;

export default dataSlice.reducer;
