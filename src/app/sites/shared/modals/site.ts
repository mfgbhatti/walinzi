import { Timestamp } from "@angular/fire/firestore";

export interface Site {
  id: string;
  clientId: string;
  name: string;
  clientName: string;
  sin: string;
  started: Timestamp;
  finished: Timestamp;
  status: boolean;
  address: string;
  post_code: string;
}
