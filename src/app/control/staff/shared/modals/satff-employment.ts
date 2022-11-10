import { Timestamp } from '@angular/fire/firestore';

export interface StaffEmployment {
  id: string;
  relative_id: string;
  name: string;
  job_title: string;
  address: string;
  post_code: string;
  contact_person: string;
  phone: string;
  email: string;
  from: Timestamp;
  to: Timestamp;
  reason_for_leaving: string;
}
