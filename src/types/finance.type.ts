export interface Finance {
  balance: Balance;
  transactions: Transaction[];
  budgets: Budget[];
  pots: Pot[];
}

export interface Balance {
  id: string;
  current: number;
  income: number;
  expenses: number;
}

export interface Budget {
  id: string;
  category: string;
  maximum: number;
  theme: string;
}

export interface Pot {
  id: string;
  name: string;
  target: number;
  total: number;
  theme: string;
}

export interface Transaction {
  id: string;
  avatar: string;
  name: string;
  category: string;
  date: Date;
  amount: number;
  recurring: boolean;
}
