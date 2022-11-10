import { Timestamp } from "@angular/fire/firestore/firebase";

export interface StaffAddress {
  id: string;
  relative_id: string;
  address: string;
  post_code: string;
  city: string;
  living_from: Timestamp;
  living_to: Timestamp;
}