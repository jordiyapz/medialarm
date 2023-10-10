import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  PlainAlarmProfile,
  AlarmProfileId,
  AlarmProfileBase,
} from "@/entities/alarm/types";
import { RootState } from "@/store";

interface AlarmFormState {
  show: boolean;
  item: AlarmProfileId | null;
}

interface AlarmState {
  profiles: PlainAlarmProfile[];
  showExpired: boolean;
  /** @deprecated use form.show instead */
  showForm: boolean;
  form: AlarmFormState;
}

const initialState: AlarmState = {
  profiles: [],
  showExpired: false,
  showForm: false,
  form: {
    show: false,
    item: null,
  },
};

export const alarmSlice = createSlice({
  name: "alarm",
  initialState,
  reducers: {
    addAlarmProfile: (state, action: PayloadAction<PlainAlarmProfile>) => {
      state.profiles.push(action.payload);
    },
    addAlarmProfiles: (state, action: PayloadAction<PlainAlarmProfile[]>) => {
      state.profiles.push(...action.payload);
    },
    updateAlarmProfile: (
      state,
      action: PayloadAction<
        Pick<AlarmProfileBase, "id"> & Partial<PlainAlarmProfile>
      >
    ) => {
      const index = state.profiles.findIndex(
        (profile) => profile.id === action.payload.id
      );
      const profile = state.profiles[index];

      // Update the profile
      state.profiles[index] = {
        id: profile.id,
        disabled: action.payload.disabled ?? profile.disabled,
        numOfRings: action.payload.numOfRings ?? profile.numOfRings,
        start: action.payload.start ?? profile.start,
        name: action.payload.name ?? profile.name,
      };
    },
    removeAllAlarmProfiles: (state) => {
      state.profiles = [];
    },
    setShowExpired: (state, action: PayloadAction<boolean>) => {
      state.showExpired = action.payload;
    },
    setAlarmDisabled: (
      state,
      action: PayloadAction<{ id: AlarmProfileId; disabled: boolean }>
    ) => {
      const alarm = state.profiles.find((t) => t.id === action.payload.id);
      if (alarm) {
        alarm.disabled = action.payload.disabled;
      }
    },
    setForm: (state, action: PayloadAction<AlarmFormState>) => {
      state.form = action.payload;
    },
    setShowForm: (state, action: PayloadAction<boolean>) => {
      state.form.show = action.payload;
    },
  },
});

export const {
  addAlarmProfile,
  addAlarmProfiles,
  updateAlarmProfile,
  removeAllAlarmProfiles,
  setAlarmDisabled,
  setShowExpired,
  setShowForm,
  setForm,
} = alarmSlice.actions;

export const selectAlarm = (s: RootState) => s.alarm;
export const selectAlarmProfiles = (s: RootState) => s.alarm.profiles;
export const selectShowAlarmForm = (s: RootState) => s.alarm.form.show;
export const selectAlarmForm = (s: RootState) => s.alarm.form;

export default alarmSlice.reducer;
