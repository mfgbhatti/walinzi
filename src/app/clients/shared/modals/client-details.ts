export interface ClientDetails {
    id: string;
    clientId: string;
    vat: number;
    website: string;
    submitted: boolean
}

export interface ClientContactPerson {
    id: string;
    clientId: string;
    name: string;
    phone: string;
}

export interface ClientNotes {
    id: string;
    clientId: string;
    note: string;
}