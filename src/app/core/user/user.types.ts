export interface User
{
    id: string;
    name: string;
    username?: string;
    title?: string;
    customerId?: string;
    customerName?: string;
    groups?: Groups[];
    about?: string;
    phone?: string;
    email: string;
    avatar?: string;
    status?: string;
}

type Groups = {
    id: number;
    name: string;
}