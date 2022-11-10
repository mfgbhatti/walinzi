import { Timestamp } from "@angular/fire/firestore/firebase";

export interface StaffVetting {
  id: string;
  relative_id: string;
  vetting_started: Timestamp;
  vetting_finished: Timestamp;
  contract_started: Timestamp;
  contract_finished: Timestamp;
  submitted: boolean;
}