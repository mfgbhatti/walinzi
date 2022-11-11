import { Timestamp } from '@angular/fire/firestore';

export interface Licence {
  id: string;
  relative_id: string;
  licence_no?: string;
  expired?: Timestamp;
  sector?: string;
  error?: boolean;
}
