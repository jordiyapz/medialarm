import dayjs from "dayjs";

import { useAppDispatch, useAppSelector } from "@/shared/hooks/store";
import { selectAlarmForm, setShowForm, setForm } from "./alarm-slice";
import { AlarmProfileId } from ".";
import { selectAlarmProfiles } from "./alarm-slice";

export const useProfileForm = () => {
  const dispatch = useAppDispatch();
  const form = useAppSelector(selectAlarmForm);

  const setOpen = (arg: boolean | ((open: boolean) => boolean)) => {
    if (typeof arg === "function") {
      dispatch(setShowForm(arg(form.show)));
    } else {
      dispatch(setShowForm(arg));
    }
  };

  const open = () => setOpen(true);
  const close = () => {
    dispatch(setForm({ show: false, item: null }));
  };
  const toggle = () => setOpen((s) => !s);
  const add = () => {
    dispatch(setForm({ show: true, item: null }));
  };
  const edit = (id: AlarmProfileId) => {
    dispatch(setForm({ show: true, item: id }));
  };

  return {
    ...form,
    isOpen: form.show,
    isEditing: form.item !== null,
    setOpen,
    open,
    toggle,
    close,
    add,
    edit,
  };
};

export const useExportProfiles = () => {
  const profiles = useAppSelector(selectAlarmProfiles);
  const exportProfiles = () => {
    const payload = profiles.map(({ numOfRings, start, name, id }) => ({
      id,
      start,
      numOfRings,
      name,
    }));
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(payload, null, 2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `profiles_${dayjs().format("YYYY-MM-DDTHH-mm-ss")}.json`;
    link.click();
  };

  return exportProfiles;
};
