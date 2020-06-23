import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const allowedTypes = ['income', 'outcome'];

    if (!allowedTypes.includes(type)) throw Error('This type does not exist');

    if (value <= 0) throw Error('Value can not be negative');

    if (type === 'outcome') {
      const { total } = this.transactionsRepository.getBalance();

      if (value > total) throw Error('You do not have enough balance');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
