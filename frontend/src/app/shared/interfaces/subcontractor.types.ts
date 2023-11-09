import { Client } from './client.types';

export interface Subcontractor extends Client {
  pay_rate: number;
}