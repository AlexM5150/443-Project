export interface IAccounts {
  _id: string;
  email: string;
  password: string;
  budget: number;
  username: string;
}

export interface IBudgets {
  _id: string;
  _user: string;
  _current: number;
  _budget: number;
  _title: string;
  expenses: {
    title: string;
    cost: number;
    created: string;
  }[];
}
