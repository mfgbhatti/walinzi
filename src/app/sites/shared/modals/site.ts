import { Timestamp } from "@angular/fire/firestore";

export interface Site {
  id: string;
  relative_id: string;
  name: string;
  sin: string;
  started: Timestamp;
  finished: Timestamp;
  status: boolean;
  address: string;
  city: string;
  post_code: string;
}
