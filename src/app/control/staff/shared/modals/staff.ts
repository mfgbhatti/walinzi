import { Timestamp } from "@angular/fire/firestore";

export interface Staff {
  id: string;
  contractor_id: string;
  position: string;
  phone: string;
  mobile: string;
  email: string;
  pay_rate: number;
  sia_number: number;
  first_name: string;
  last_name: string;
  pin: string;
  status: boolean;
  added: Timestamp;
}
