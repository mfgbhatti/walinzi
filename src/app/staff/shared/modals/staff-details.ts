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

export interface StaffAddress {
  id: string;
  relative_id: string;
  address: string;
  post_code: string;
  city: string;
  living_from: Timestamp;
  living_to: Timestamp;
}

export interface StaffBankDetail {
  id: string;
  relative_id: string;
  bank_name: string;
  account_title: string;
  bank_account: string;
  sort_code: string;
}
export interface StaffDocument {
  id: string;
  relative_id: string;
  title: string
  number: string
  country_of_issue: string;
  issued: Timestamp;
  expired: Timestamp;
}
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

export interface StaffVetting {
  id: string;
  relative_id: string;
  vetting_started: Timestamp;
  vetting_finished: Timestamp;
  contract_started: Timestamp;
  contract_finished: Timestamp;
  submitted: boolean;
}
