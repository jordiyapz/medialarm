import { IconButton, IconButtonProps } from "@mui/material";
import React, { useState } from "react";
import WarningIcon from "@mui/icons-material/Warning";

type WarnIconButtonProps = IconButtonProps;
export const WarnIconButton = ({
  children,
  onClick,
  ...props
}: WarnIconButtonProps) => {
  const [clicked, setClicked] = useState(false);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!clicked) setClicked(true);
    else if (onClick) onClick(e);
  };
  const handleMouseOut = () => {
    setClicked(false);
  };
  return (
    <IconButton {...props} onClick={handleClick} onMouseOut={handleMouseOut}>
      {clicked ? <WarningIcon color="warning" /> : children}
    </IconButton>
  );
};
