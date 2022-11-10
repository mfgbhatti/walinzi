import { Timestamp } from "@angular/fire/firestore/firebase";

export interface StaffPassport {
  id: string;
  relative_id: string;
  passport_no: string;
  country_of_issue: string;
  issued: Timestamp;
  expired: Timestamp;
  visa: string;
  submitted: boolean;
}