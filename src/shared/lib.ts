import { useState } from "react";

export const useOpenable = (initialOpen: boolean) => {
  const [open, setOpen] = useState(initialOpen);
  const toggle = () => setOpen(!open);
  return { open, setOpen, toggle };
};
