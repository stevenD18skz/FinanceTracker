import { transactionsData } from "../Data";

const getAllTransactions = () => {
  return transactionsData;
};

const getTransactionById = (id) => {
  return transactionsData.find((transaction) => transaction.id === id);
};

const createTransaction = (newTransaction) => {
  transactionsData.push(newTransaction);
  return newTransaction;
};

const updateTransaction = (id, updatedTransaction) => {
  const index = transactionsData.findIndex(
    (transaction) => transaction.id === id,
  );
  if (index !== -1) {
    transactionsData[index] = {
      ...transactionsData[index],
      ...updatedTransaction,
    };
    return transactionsData[index];
  }
  return null;
};

const deleteTransaction = (id) => {
  const index = transactionsData.findIndex(
    (transaction) => transaction.id === id,
  );
  if (index !== -1) {
    const deletedTransaction = transactionsData.splice(index, 1);
    return deletedTransaction[0];
  }
  return null;
};

export {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
