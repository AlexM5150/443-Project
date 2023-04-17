export interface IError {
  message: string;
  active: boolean;
}

export interface ICategoryStates {
  [index: string]: boolean;
}

export interface IBudget {
  id: string;
  _id: string;
  _user: string;
  _current: number;
  created: number;
  _budget: number;
  _title: string;
  expenses: {
    category: string;
    current: number;
    budget: number;
    _id: string;
    expenses: {
      title: string;
      cost: number;
      created: string;
      _id: string;
    }[];
  }[];
}

export interface ICategory{
  category: string;
  current: number;
  budget: number;
  _id: string;
  expenses: {
    title: string;
    cost: number;
    created: string;
    _id: string;
  }[];  
}