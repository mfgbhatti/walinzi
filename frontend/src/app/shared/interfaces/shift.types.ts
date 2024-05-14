export interface Shift {
  id: string;
  location: string;
  location_name: string;
  time_in: Date;
  time_out: Date;
  date_in: Date;
  date_out: Date;
  break_duration: Date;
  is_active: boolean;
  timesheet: Timesheet[];
  shift_log: ShiftLog[];
  duration: number;
  break_display: Date;
}

export interface Timesheet {
  id: string;
  shift_date: Date;
  duration: number;
  notes: string;
  staff: string;
  staff_name: string;
  shift: string;
}

interface ShiftLog extends Timesheet {
  user: string;
  action: string;
}
