import { Timestamp } from "@angular/fire/firestore/firebase";

export interface StaffDocument {
  id: string;
  relative_id: string;
  title: string
  number: string
  country_of_issue: string;
  issued: Timestamp;
  expired: Timestamp;
}