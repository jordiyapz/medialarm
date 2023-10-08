import { useEffect, useMemo, useState } from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { useTimer } from "react-timer-hook";
import { d2 } from "@/shared/lib";
import { useAlarmAudio } from "@/hooks/audio-player";

import { AlarmProfile, findNextAlarm, rehydrateAlarmProfile } from "..";
import { selectAlarmProfiles, toggleAlarmProfile } from "../alarm-slice";
import { SkipButton } from "./SkipButton";
import ringtone from "/singing-bowl.mp3";

const NextAlarm = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [nextAlarm, setNextAlarm] = useState<AlarmProfile | null>(null);

  const plainAlarmProfiles = useAppSelector(selectAlarmProfiles);
  const alarmProfiles = useMemo(
    () => plainAlarmProfiles.map(rehydrateAlarmProfile),
    [plainAlarmProfiles]
  );

  // TODO: Make this as context so that it always alive not holded by drawer
  // const player = useAlarmAudio(ringtone);
  const handleExpire = () => {
    if (nextAlarm) {
      dispatch(toggleAlarmProfile({ id: nextAlarm.id, disabled: true }));
      // player.ring(nextAlarm.numOfRings);
    }
    const newNext = findNextAlarm(alarmProfiles);
    setNextAlarm(newNext);
  };

  const { days, hours, minutes, seconds, pause, restart } = useTimer({
    expiryTimestamp: new Date(),
    autoStart: !!nextAlarm,
    onExpire: handleExpire,
  });

  useEffect(() => {
    const newNext = findNextAlarm(alarmProfiles);
    setNextAlarm(newNext);
    return () => setNextAlarm(null);
  }, [alarmProfiles]);

  useEffect(() => {
    if (nextAlarm !== null) restart(nextAlarm.start);
    return pause;
  }, [nextAlarm, restart, pause]);

  const handleSkip = () => {
    if (nextAlarm)
      dispatch(toggleAlarmProfile({ id: nextAlarm.id, disabled: true }));
  };

  return (
    <Stack direction="row" alignItems="center">
      <Box>
        <Typography
          component="h1"
          fontSize="1.2rem"
          color={theme.palette.text.secondary}
        >
          Next Alarm
        </Typography>
        {!nextAlarm ? (
          "None"
        ) : (
          <Stack direction="row" alignItems="center" gap={1.5}>
            <Box>
              <Typography fontSize="1.4rem" lineHeight={1.1}>
                {d2(hours)}:{d2(minutes)}
              </Typography>
              {days > 0 && (
                <Typography fontSize=".8rem" fontWeight={100} color="primary">
                  {`(+${days} day${days > 1 ? "s" : ""})`}
                </Typography>
              )}
            </Box>
            <Box>
              <Typography
                variant="subtitle2"
                fontWeight={100}
                fontSize=".9rem"
                color={theme.palette.text.secondary}
              >
                will ring in
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                {days ? `${days} d, ` : ""}
                {hours}h {d2(minutes)}m {d2(seconds)}s
              </Typography>
            </Box>
          </Stack>
        )}
      </Box>
      {nextAlarm && <SkipButton countdown={5} onConfirm={handleSkip} />}
    </Stack>
  );
};

export default NextAlarm;
