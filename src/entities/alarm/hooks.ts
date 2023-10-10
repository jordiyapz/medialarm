import { useAppDispatch, useAppSelector } from "@/shared/hooks/store";
import { selectShowAlarmForm, setShowForm } from "./alarm-slice";

export const useProfileForm = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectShowAlarmForm);

  const setOpen = (arg: boolean | ((open: boolean) => boolean)) => {
    if (typeof arg === "function") {
      dispatch(setShowForm(arg(isOpen)));
    } else {
      dispatch(setShowForm(arg));
    }
  };

  const open = () => setOpen(true);
  const close = () => setOpen(false);
  const toggle = () => setOpen((s) => !s);

  return { isOpen, setOpen, open, toggle, close };
};
