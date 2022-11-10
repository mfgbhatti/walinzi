import { Timestamp } from '@angular/fire/firestore';

export interface StaffOrigin {
  id: string;
  relative_id: string;
  gender: string;
  ethnic_origin: string;
  date_of_birth: Timestamp;
  place_of_birth: string;
  nationality: string;
  submitted: boolean;
}