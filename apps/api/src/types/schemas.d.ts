export interface IAccounts {
  _id: string;
  email: string;
  password: string;
  budget: number;
  username: string;
}

export interface IExpenses {
  _id: string;
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
  created: number;
  expenses: {
    _id: string;
    category: string;
    budget: number;
    current: number;
    created: number;
    expenses: IExpenses[];
  }[];
}
