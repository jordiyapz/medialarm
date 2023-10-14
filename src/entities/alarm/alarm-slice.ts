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
  profiles: [
    {
      id: "briefing-1",
      start: "2023-10-14T07:30:00",
      numOfRings: 3,
      name: "Briefing peserta",
      disabled: false,
    },
    {
      id: "precept-1",
      start: "2023-10-14T08:00:00",
      numOfRings: 3,
      name: "Pengambilan sīla",
      disabled: false,
    },
    {
      id: "session-1-1",
      start: "2023-10-14T08:10:00",
      numOfRings: 3,
      name: "Materi sesi 1",
      disabled: false,
    },
    {
      id: "break-1-1",
      start: "2023-10-14T09:20:00",
      numOfRings: 3,
      name: "Istirahat 1",
      disabled: false,
    },
    {
      id: "session-2-1",
      start: "2023-10-14T09:30:00",
      numOfRings: 3,
      name: "Materi sesi 2",
      disabled: false,
    },
    {
      id: "buddhapuja-1",
      start: "2023-10-14T10:30:00",
      numOfRings: 3,
      name: "Buddhapuja",
      disabled: false,
    },
    {
      id: "lunch-1",
      start: "2023-10-14T11:00:00",
      numOfRings: 3,
      name: "Makan siang",
      disabled: false,
    },
    {
      id: "session-3-1",
      start: "2023-10-14T12:30:00",
      numOfRings: 3,
      name: "Materi sesi 3",
      disabled: false,
    },
    {
      id: "coffee-break-1",
      start: "2023-10-14T14:30:00",
      numOfRings: 3,
      name: "Coffee break",
      disabled: false,
    },
    {
      id: "session-4-1",
      start: "2023-10-14T15:00:00",
      numOfRings: 3,
      name: "Materi sesi 4",
      disabled: false,
    },
    {
      id: "break-2-1",
      start: "2023-10-14T17:00:00",
      numOfRings: 3,
      name: "Istirahat 2",
      disabled: false,
    },
    {
      id: "qna-1",
      start: "2023-10-14T17:15:00",
      numOfRings: 3,
      name: "Tanya-Jawab",
      disabled: false,
    },
    {
      id: "okasa-1",
      start: "2023-10-14T18:30:00",
      numOfRings: 3,
      name: "Permohonan maaf (okasa)",
      disabled: false,
    },
    {
      id: "merit-1",
      start: "2023-10-14T18:35:00",
      numOfRings: 3,
      name: "Pelimpahan jasa",
      disabled: false,
    },
    {
      id: "photo-1",
      start: "2023-10-14T18:45:00",
      numOfRings: 3,
      name: "Foto bersama",
      disabled: false,
    },
  ],
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
    appendAlarmProfile: (state, action: PayloadAction<PlainAlarmProfile>) => {
      const newProfile = action.payload;
      const existingProfileIndex = state.profiles.findIndex(
        (profile) => profile.id === newProfile.id
      );
      if (existingProfileIndex === -1) state.profiles.push(newProfile);
      else {
        state.profiles[existingProfileIndex] = newProfile;
      }
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
      if (index === -1) return;

      const profile = state.profiles[index];

      state.profiles[index] = {
        id: profile.id,
        disabled: action.payload.disabled ?? profile.disabled,
        numOfRings: action.payload.numOfRings ?? profile.numOfRings,
        start: action.payload.start ?? profile.start,
        name: action.payload.name ?? profile.name,
      };
    },
    deleteAlarmProfile: (state, action: PayloadAction<AlarmProfileId>) => {
      const index = state.profiles.findIndex(
        (profile) => profile.id === action.payload
      );
      if (index !== -1) {
        state.profiles.splice(index, 1);
      }
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
      state.form.item = null;
    },
  },
});

export const {
  addAlarmProfile,
  addAlarmProfiles,
  appendAlarmProfile,
  updateAlarmProfile,
  deleteAlarmProfile,
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
