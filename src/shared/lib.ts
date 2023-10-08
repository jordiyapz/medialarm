import { useState } from "react";

export const useOpenable = (initialOpen: boolean) => {
  const [open, setOpen] = useState(initialOpen);
  const toggle = () => setOpen(!open);
  return { open, setOpen, toggle };
};

export function d2(x: number): string {
  return String(x).padStart(2, "0");
}

/** return new date with added second */
export function addSecond(d: Date, second: number): Date {
  const newDate = new Date(d.getTime());
  newDate.setSeconds(d.getSeconds() + second);
  return newDate;
}
