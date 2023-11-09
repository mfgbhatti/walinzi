import { Client } from './client.types';

export interface Customer extends Client {
  charge_rate: number;
  client: string;
}
