import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PlainAlarmProfile, AlarmProfileId } from "@/entities/alarm/types";
import { RootState } from "@/store";

interface AlarmState {
  profiles: PlainAlarmProfile[];
  showExpired: boolean;
  showForm: boolean;
}

const initialState: AlarmState = {
  profiles: [],
  showExpired: false,
  showForm: false,
};

export const alarmSlice = createSlice({
  name: "alarm",
  initialState,
  reducers: {
    addAlarmProfiles: (state, action: PayloadAction<PlainAlarmProfile[]>) => {
      state.profiles.push(...action.payload);
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
    setShowForm: (state, action: PayloadAction<boolean>) => {
      state.showForm = action.payload;
    },
    removeAllAlarmProfiles: (state) => {
      state.profiles = [];
    },
    setShowExpired: (state, action: PayloadAction<boolean>) => {
      state.showExpired = action.payload;
    },
  },
});

export const {
  addAlarmProfiles,
  removeAllAlarmProfiles,
  toggleAlarmProfile,
  setShowExpired,
  setShowForm,
} = alarmSlice.actions;

export const selectAlarm = (s: RootState) => s.alarm;
export const selectAlarmProfiles = (s: RootState) => s.alarm.profiles;
export const selectShowAlarmForm = (s: RootState) => s.alarm.showForm;

export default alarmSlice.reducer;
