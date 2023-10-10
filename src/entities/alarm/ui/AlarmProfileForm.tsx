import { Box, Button, Card, ListItem, Stack, TextField } from "@mui/material";
import { Form, Formik, FormikConfig } from "formik";
import { AlarmProfile, createProfile } from "..";
import FMTextField from "@/shared/ui/FMTextField";
import dayjs from "dayjs";
import { useEffect, useMemo, useRef } from "react";
import { useAppDispatch } from "@/shared/hooks/store";
import { addAlarmProfiles } from "../alarm-slice";

interface AlarmProfileValues
  extends Pick<Required<AlarmProfile>, "name" | "numOfRings"> {
  date: string;
  time: string;
}

type AlarmProfileFormProps = {
  values?: Partial<AlarmProfile>;
};

const AlarmProfileForm = ({ values = {} }: AlarmProfileFormProps) => {
  const initialValues = useMemo(() => {
    const today = new Date();
    const dateVal = dayjs(values.start ?? today);
    const initialValues: AlarmProfileValues = {
      date: dateVal.format("YYYY-MM-DD"),
      time: dateVal.format("HH:mm"),
      numOfRings: values.numOfRings ?? 1,
      name: values.name ?? "",
    };
    return initialValues;
  }, [values]);

  const dispatch = useAppDispatch();

  const nameRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      // Do something
    }
  };

  useEffect(() => {
    if (nameRef.current)
      window.addEventListener("keyup", handleKeyPress, false);
  }, [nameRef]);

  const handleSubmit: FormikConfig<AlarmProfileValues>["onSubmit"] = (
    values,
    { setSubmitting }
  ) => {
    const { numOfRings, name } = values;
    const newProfile = createProfile({
      numOfRings,
      name,
      start: dayjs(
        `${values.date} ${values.time}`,
        "YYYY-MM-DD HH:mm"
      ).toDate(),
    });
    dispatch(addAlarmProfiles([newProfile]));
    console.debug(newProfile);
    setSubmitting(false);
  };

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
                placeholder="Alarm name"
                size="small"
                sx={{ flex: 2 }}
              />
            </Stack>
            <Stack direction="row">
              <Button color="inherit">Cancel</Button>
              <Button type="submit">Save</Button>
            </Stack>
          </Card>
        </ListItem>
      )}
    </Formik>
  );
};

export default AlarmProfileForm;
