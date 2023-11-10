import { Client } from './client.types';

export interface Location extends Client {
  charge_rate: number;
  customer: number;
  customer_name: string;
}
