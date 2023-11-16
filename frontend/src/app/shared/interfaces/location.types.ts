import { Client } from './client.types';

export interface Location extends Client {
  charge_rate: number;
  customer: string;
  customer_name: string;
}
