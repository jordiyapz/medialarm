import { AudioConfig } from "@/shared/hooks/alarm-audio";

export type AlarmProfileId = string;

export interface AlarmProfileBase {
  id: AlarmProfileId;
  name?: string;
  numOfRings: number;
  disabled: boolean;
}

export interface PlainAlarmProfile extends AlarmProfileBase {
  start: string;
}
export interface AlarmProfile extends AlarmProfileBase {
  start: Date;
}

export interface AlarmConfig extends AudioConfig {}
