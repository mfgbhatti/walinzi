export interface ClientDetails {
    id: string;
    clientId: string;
    vat: number;
    website: string;
}

export interface ClientContactPerson {
    id: string;
    clientId: string;
    name: string;
    phone: number;
}

export interface ClientNotes {
    id: string;
    clientId: string;
    note: string;
}