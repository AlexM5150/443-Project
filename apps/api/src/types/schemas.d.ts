export interface IAccounts {
  _id: string;
  email: string;
  password: string;
  budget: number;
  username: string;
}

export interface IExpenses {
  title: string;
  cost: number;
  created: string;
}

export interface IBudgets {
  _id: string;
  _user: string;
  _current: number;
  _budget: number;
  _title: string;
  expenses: {
    category: string;
    budget: number;
    expenses: IExpenses[];
  }[];
}
