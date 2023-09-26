import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface AdministratorInterface {
  id?: string;
  user_id: string;
  name: string;
  phone_number: string;
  address: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface AdministratorGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  name?: string;
  phone_number?: string;
  address?: string;
}
