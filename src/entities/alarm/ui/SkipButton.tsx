import { IconButton, Tooltip } from "@mui/material";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import WarningIcon from "@mui/icons-material/Warning";
import { useState } from "react";
import { useTimer } from "react-timer-hook";

type SkipButtonProps = {
  countdown?: number;
  onConfirm(): void;
};
export function SkipButton({ onConfirm, countdown = 3 }: SkipButtonProps) {
  const [willSkip, setWillSkip] = useState(false);
  const timer = useTimer({
    autoStart: false,
    onExpire: () => setWillSkip(false),
    expiryTimestamp: new Date(),
  });

  const handleClick = () => {
    setWillSkip(!willSkip);
    if (!willSkip) {
      const d = new Date();
      d.setSeconds(d.getSeconds() + countdown);
      timer.restart(d);
    } else {
      setWillSkip(false);
      onConfirm();
    }
  };

  const handleMouseLeave = () => {
    setWillSkip(false);
    timer.pause();
  };

  return (
    <Tooltip
      title={
        willSkip
          ? `Are you sure to skip this alarm? [${timer.seconds}s]`
          : "Skip this alarm"
      }
      placement="top-end"
    >
      <IconButton
        aria-label="turn-off"
        size="large"
        color={willSkip ? "warning" : "secondary"}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {willSkip ? <WarningIcon /> : <NotificationsOffIcon />}
      </IconButton>
    </Tooltip>
  );
}
