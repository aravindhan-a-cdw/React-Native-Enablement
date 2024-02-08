import {createAccount} from '../services/auth';

export const createUserAccounts = async () => {
  const accounts = [
    {email: 'user1@cdw.com', password: 'Welcome@123'},
    {
      email: 'user2@cdw.com',
      password: 'Welcome@123',
    },
  ];
  for (const account of accounts) {
    try {
      const response = await createAccount(account.email, account.password);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
};
