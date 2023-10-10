import { Button, Card, ListItem, Stack } from "@mui/material";
import { Form, Formik, FormikConfig } from "formik";
import { AlarmProfile, createProfile, serializeAlarmProfile } from "..";
import FMTextField from "@/shared/ui/FMTextField";
import dayjs from "dayjs";
import { useEffect, useMemo, useRef } from "react";
import { useAppDispatch } from "@/shared/hooks/store";
import { addAlarmProfiles, updateAlarmProfile } from "../alarm-slice";
import { useProfileForm } from "../hooks";

interface AlarmProfileValues
  extends Pick<Required<AlarmProfile>, "name" | "numOfRings"> {
  date: string;
  time: string;
}

type AlarmProfileFormProps = {
  values?: Partial<AlarmProfile>;
};

const AlarmProfileForm = ({ values = {} }: AlarmProfileFormProps) => {
  const profileForm = useProfileForm();
  const dispatch = useAppDispatch();

  const initialValues = useMemo(() => {
    const today = dayjs().add(1, "minute");
    const dateVal = dayjs(values.start ?? today);
    const initialValues: AlarmProfileValues = {
      date: dateVal.format("YYYY-MM-DD"),
      time: dateVal.format("HH:mm"),
      numOfRings: values.numOfRings ?? 1,
      name: values.name ?? "",
    };
    return initialValues;
  }, [values]);

  const nameRef = useRef<HTMLInputElement>(null);
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      // Do something
    }
  };
  const handleSubmit: FormikConfig<AlarmProfileValues>["onSubmit"] = (
    values,
    { setSubmitting }
  ) => {
    const { date, time, ...rest } = values;
    const newDate = dayjs(`${date} ${time}`, "YYYY-MM-DD HH:mm").toDate();
    if (profileForm.isEditing) {
      dispatch(
        updateAlarmProfile({
          id: profileForm.item as string, // because the state is editing, means item is not null.
          ...serializeAlarmProfile({ ...rest, start: newDate }),
        })
      );
      profileForm.close();
    } else {
      const newProfile = createProfile({
        ...rest,
        start: newDate,
      });
      dispatch(addAlarmProfiles([newProfile]));
    }
    setSubmitting(false);
  };

  useEffect(() => {
    if (nameRef.current)
      window.addEventListener("keyup", handleKeyPress, false);
  }, [nameRef]);

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {() => (
        <ListItem>
          <Card
            component={Form}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              width: "100%",
              border: "1px solid grey",
              borderRadius: 1,
              alignItems: "flex-end",
              p: 1,
            }}
          >
            <FMTextField
              name="date"
              type="date"
              variant="outlined"
              helperText="mm/dd/yyyy"
              size="small"
              fullWidth
            />
            <FMTextField name="time" type="time" variant="outlined" fullWidth />
            <Stack direction="row" gap={2}>
              <FMTextField
                name="numOfRings"
                label="#Rings"
                type="number"
                size="small"
                sx={{ flex: 1 }}
              />
              <FMTextField
                ref={nameRef}
                name="name"
                label="Alarm name (optional)"
                size="small"
                sx={{ flex: 2 }}
              />
            </Stack>
            <Stack direction="row">
              <Button color="inherit" onClick={profileForm.close}>
                Close
              </Button>
              <Button type="submit">
                {profileForm.isEditing ? "Update" : "Add"}
              </Button>
            </Stack>
          </Card>
        </ListItem>
      )}
    </Formik>
  );
};

export default AlarmProfileForm;
