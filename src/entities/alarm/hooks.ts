import { useAppDispatch, useAppSelector } from "@/shared/hooks/store";
import { selectAlarmForm, setShowForm, setForm } from "./alarm-slice";
import { AlarmProfileId } from ".";

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
