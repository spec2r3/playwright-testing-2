export type UserRole = 'admin' | 'user';

export interface TestUser {
  firstName: string;
  lastName: string;
  role: UserRole;
  email: string;
  password: string;
}

export const USERS: Record<string, TestUser> = {
  admin: {
    firstName: 'John',
    lastName: 'Doe',
    role: 'admin',
    email: 'admin@practicesoftwaretesting.com',
    password: 'welcome01'
  },
  customer: {
    firstName: 'Jane',
    lastName: 'Doe',
    role: 'user',
    email: 'customer@practicesoftwaretesting.com',
    password: 'welcome01'
  },
  customer2: {
    firstName: 'Jack',
    lastName: 'Howe',
    role: 'user',
    email: 'customer2@practicesoftwaretesting.com',
    password: 'welcome01'
  },
  customer3: {
    firstName: 'Bob',
    lastName: 'Smith',
    role: 'user',
    email: 'customer3@practicesoftwaretesting.com',
    password: 'pass123'
  },
  invalidCustomer:{
    firstName: '',
    lastName: '',
    role: 'user',
    email: 'invalid@email.com',
    password: 'fail123'
  }
};
