import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PlainTimelet, Timelet, TimeletId } from "@/entities/timelet/types";

interface AlarmState {
  timelets: PlainTimelet[];
}

const initialState = {
  timelets: [],
} as AlarmState;

export const alarmSlice = createSlice({
  name: "alarms",
  initialState,
  reducers: {
    addAlarm: (state, action: PayloadAction<Timelet[]>) => {
      state.timelets.push(
        ...action.payload.map((t) => ({ ...t, start: t.start.toISOString() }))
      );
    },
    toggleAlarm: (
      s,
      action: PayloadAction<{ id: TimeletId; disabled: boolean }>
    ) => {
      const alarm = s.timelets.find((t) => t.id === action.payload.id);
      if (alarm) {
        alarm.disabled = action.payload.disabled;
      }
    },
    removeAllAlarms: (state) => {
      state.timelets = [];
    },
  },
});

export const { addAlarm, removeAllAlarms, toggleAlarm } = alarmSlice.actions;

export default alarmSlice.reducer;
