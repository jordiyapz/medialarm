import dayjs, { Dayjs } from "dayjs";
import { useCallback, useMemo, useState } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  Stack,
  Typography,
} from "@mui/material";
import { DatePicker, DateValidationError } from "@mui/x-date-pickers";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/store";

import { createProfile, rehydrateAlarmProfile } from "../lib";
import { addAlarmProfiles } from "../alarm-slice";
import { AlarmListItemBase } from "./AlarmListItemBase";
import { toast } from "react-toastify";

type Props = {
  open: boolean;
  onClose(): void;
};

const DuplicateByDateDialog = ({ open, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const profiles = useAppSelector((state) => state.alarm.profiles);
  const [fromDate, setFromDate] = useState<Dayjs | null>(dayjs());
  const [toDate, setToDate] = useState<Dayjs | null>(dayjs().add(1, "day"));
  const [error, setError] = useState<DateValidationError | null>(null);
  const errorMessage = useMemo(() => {
    switch (error) {
      case "shouldDisableDate":
        return "Date must different from fromDate";
      default:
        return null;
    }
  }, [error]);

  console.debug(profiles.map((profile) => profile.id));

  const filteredProfiles = useMemo(() => {
    if (!fromDate) return [];
    const filtered = profiles
      .filter((p) => dayjs(p.start).isSame(fromDate, "day"))
      .map(rehydrateAlarmProfile);
    return filtered;
  }, [fromDate, profiles]);

  const handleShouldDisableDate = useCallback(
    (day: Dayjs) => day.isSame(fromDate, "day"),
    [fromDate]
  );

  const handleDuplicate = useCallback(() => {
    if (!toDate) throw new Error("toDate must be specified");
    const newProfiles = filteredProfiles.map((p) =>
      createProfile({
        ...p,
        start: dayjs(p.start).set("date", toDate.get("date")).toDate(),
      })
    );
    dispatch(addAlarmProfiles(newProfiles));
    toast.success("Profiles duplicated successfully!");
    onClose();
  }, [filteredProfiles, toDate, dispatch, onClose]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Duplicate by Date</DialogTitle>
      <DialogContent>
        <Stack py={2} gap={1}>
          <DatePicker
            label="From date"
            value={fromDate}
            onChange={(val) => setFromDate(val)}
          />
          <DatePicker
            label="To date"
            value={toDate}
            onChange={(val) => setToDate(val)}
            onError={(error) => setError(error)}
            shouldDisableDate={handleShouldDisableDate}
            slotProps={{ textField: { helperText: errorMessage } }}
          />
          {filteredProfiles.length ? (
            <>
              <Typography variant="body1" fontWeight={600} mt={2}>
                These profiles will be duplicated
              </Typography>
              <List disablePadding sx={{ maxHeight: 200, overflowY: "auto" }}>
                {filteredProfiles.map((profile) => {
                  return (
                    <AlarmListItemBase
                      key={profile.id}
                      profile={profile}
                      neverExpired
                    />
                  );
                })}
              </List>
              <Typography variant="body2">
                Total: {filteredProfiles.length} profiles
              </Typography>
            </>
          ) : (
            <Alert severity="warning">
              Current from date does not contain any profile
            </Alert>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          disabled={!!error || !filteredProfiles.length}
          onClick={handleDuplicate}
        >
          Duplicate
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DuplicateByDateDialog;
