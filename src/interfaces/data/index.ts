import { ClientInterface } from 'interfaces/client';
import { GetQueryInterface } from 'interfaces';

export interface DataInterface {
  id?: string;
  option_type: string;
  strike_price: number;
  expiry_date: any;
  client_id: string;
  created_at?: any;
  updated_at?: any;

  client?: ClientInterface;
  _count?: {};
}

export interface DataGetQueryInterface extends GetQueryInterface {
  id?: string;
  option_type?: string;
  client_id?: string;
}
