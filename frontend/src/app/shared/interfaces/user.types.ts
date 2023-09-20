export interface User {
  id: string;
  is_active: boolean;
  is_superuser: boolean;
  is_admin: boolean;
  title: string;
  first_name: string;
  last_name: string;
  username: string;
  phone: string;
  email: string;
  last_login: string;
  date_joined: string;
  activation_key: string
  activation_link: string
  client: string;
  // groups:
  // user_permissions:
}