import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  PlainAlarmProfile,
  AlarmProfile,
  AlarmProfileId,
} from "@/entities/alarm/types";

interface AlarmState {
  profiles: PlainAlarmProfile[];
}

const initialState = {
  profiles: [],
} as AlarmState;

export const alarmSlice = createSlice({
  name: "alarms",
  initialState,
  reducers: {
    addAlarmProfiles: (state, action: PayloadAction<AlarmProfile[]>) => {
      state.profiles.push(
        ...action.payload.map((t) => ({ ...t, start: t.start.toISOString() }))
      );
    },
    toggleAlarmProfile: (
      s,
      action: PayloadAction<{ id: AlarmProfileId; disabled: boolean }>
    ) => {
      const alarm = s.profiles.find((t) => t.id === action.payload.id);
      if (alarm) {
        alarm.disabled = action.payload.disabled;
      }
    },
    removeAllAlarmProfiles: (state) => {
      state.profiles = [];
    },
  },
});

export const { addAlarmProfiles, removeAllAlarmProfiles, toggleAlarmProfile } =
  alarmSlice.actions;

export default alarmSlice.reducer;
