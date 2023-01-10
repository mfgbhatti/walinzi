export interface Client {
  id: string;
  name: string;
  title?: string;
  detail?: Detail;
  address?: Address;

}

type Address = {
  street?: string;
  city?: string;
  postCode?: string;
}

type Detail = {
  vat_number?: string;
  website?: string;
  phoneNumbers?: {
    phone: string;
    label: string;
  }[];
  emails?: {
    email: string;
    label: string;
  }[];
  notes?: {
    label: string;
    note: string;
  }[];
}
