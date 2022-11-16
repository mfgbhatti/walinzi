export interface Client {
  id: string;
  name: string;
  display_name?: string;
  phone_numbers?: {
    phone_number: string;
    label: string;
  };
  emails?: {
    email: string;
    label: string;
  };
  address?: string;
  notes?: {
    description: string;
    label: string;
  };
  vat?: string;
  website?: string;
  status: boolean;
}
