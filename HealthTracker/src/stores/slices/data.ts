import {createSlice} from '@reduxjs/toolkit';
import store from '..';

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
    data: GoalData;
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
      console.log(state);
    },
    setDailyData: (state, action: DailyGoalAction) => {
      state.dailyData[action.payload.date] = action.payload.data;
    },
  },
});

export const {setWeeklyGoals, setDailyData} = dataSlice.actions;

export const selectWeeklyGoals = (state: RootState) => state.data.weeklyGoals;

export const selectDailyData = (state: RootState, date: string) =>
  state.data.dailyData[date];

export default dataSlice.reducer;
