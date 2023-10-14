import { IconButton, Menu } from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { nanoid } from "@reduxjs/toolkit";

export type MoreMenuProps = {
  children: React.ReactNode;
};

const MoreMenu = ({ children }: MoreMenuProps) => {
  const btnId = nanoid();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton
        id={btnId}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id={`menu-${btnId}`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": btnId }}
      >
        {children}
      </Menu>
    </div>
  );
};

export default MoreMenu;
