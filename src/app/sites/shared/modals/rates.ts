export interface ChargedRate{
  id: string;
  relativeId: string;
  type: string;
  charged_rate: number;
  status: boolean
}
export interface PayRate{
  id: string;
  relativeId: string;
  type: string;
  pay_rate: number;
  status: boolean
}


export const RateTypes: string[] = ['Security Guard', 'Dog Handler', 'Door Supervisor', 'Receptionist'];

