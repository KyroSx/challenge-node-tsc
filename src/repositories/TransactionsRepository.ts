import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeTransactionsFiltred = this.transactions.filter(
      transaction => transaction.type === 'income',
    );

    const incomeBalance = incomeTransactionsFiltred.reduce(
      (accum: number, transaction) => accum + transaction.value,
      0,
    );

    const outcomeTransactionsFiltred = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    const outcomeBalance = outcomeTransactionsFiltred.reduce(
      (accum: number, transaction) => accum + transaction.value,
      0,
    );

    const total = incomeBalance - outcomeBalance;

    const balance = {
      income: incomeBalance,
      outcome: outcomeBalance,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      type,
      value,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
