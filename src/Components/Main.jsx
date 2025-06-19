import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";

const Main = () => {
  const [income, setIncome] = useState(() => {
    return parseFloat(localStorage.getItem("income")) || 0;
  });
  const [expense, setExpense] = useState(() => {
    return parseFloat(localStorage.getItem("expense")) || 0;
  });
  const [transactions, setTransactions] = useState(() => {
    return JSON.parse(localStorage.getItem("transactions")) || [];
  });

  const [amountInput, setAmountInput] = useState("");

  const handleDelete = (id) => {
    // Find the transaction to be deleted
    const deletedTxn = transactions.find((txn) => txn.id === id);

    if (!deletedTxn) return;

    // Remove it from the transaction list
    const updatedTransactions = transactions.filter((txn) => txn.id !== id);
    setTransactions(updatedTransactions);

    // Adjust income or expense total
    if (deletedTxn.type === "income") {
      setIncome((prev) => prev - deletedTxn.amount);
    } else if (deletedTxn.type === "expense") {
      setExpense((prev) => prev - deletedTxn.amount);
    }
  };

  const handleReset = () => {
    setIncome(0);
    setExpense(0);
    setTransactions([]);
    setAmountInput("");
    localStorage.removeItem("income");
    localStorage.removeItem("expense");
    localStorage.removeItem("transactions");
  };

  useEffect(() => {
    localStorage.setItem("income", income);
  }, [income]);

  useEffect(() => {
    localStorage.setItem("expense", expense);
  }, [expense]);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const handleAdd = (type) => {
    const amount = parseFloat(amountInput);
    if (!isNaN(amount) && amount > 0) {
      const newTransaction = {
        id: Date.now(),
        type,
        amount,
        date: new Date().toLocaleString(),
      };
      setTransactions((prev) => [newTransaction, ...prev]);

      if (type === "income") {
        setIncome((prev) => prev + amount);
      } else if (type === "expense") {
        setExpense((prev) => prev + amount);
      }

      setAmountInput("");
    }
  };

  const remaining = income - expense;

  return (
    <div className="flex justify-center items-center p-20">
      <div className="bg-blue-200 rounded-2xl h-auto w-1/2 p-10">
        <div className="flex justify-between mb-10">
          <div className="text-green-600 border border-green-600 rounded-lg text-2xl bg-white text-center h-20 w-40 flex items-center justify-center">
            Income: ${income}
          </div>
          <div className="text-red-600 border border-red-600 rounded-lg text-2xl bg-white text-center h-20 w-40 flex items-center justify-center">
            Expense: ${expense}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <input
            type="number"
            value={amountInput}
            onChange={(e) => setAmountInput(e.target.value)}
            placeholder="Enter amount"
            className="p-2 border border-black rounded mb-2 w-60"
          />
          <div className="flex space-x-4">
            <button
              onClick={() => handleAdd("income")}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add Income
            </button>
            <button
              onClick={() => handleAdd("expense")}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Add Expense
            </button>
          </div>
        </div>
        <div className="bg-blue-500 mt-10 h-20 w-full text-2xl p-6 flex items-center justify-center rounded-2xl text-white">
          Remaining Amount: ${remaining}
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4 text-center">
            Transaction History
          </h2>
          <ul className="space-y-2 max-h-60 overflow-y-auto">
            {transactions.map((txn) => (
              <li
                key={txn.id}
                className={`flex justify-between items-center p-3 rounded-lg shadow-md ${
                  txn.type === "income" ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <span>{txn.type.toUpperCase()}</span>
                <span>${txn.amount.toFixed(2)}</span>
                <span className="text-sm text-gray-600">{txn.date}</span>
                <button
                  onClick={() => handleDelete(txn.id)}
                  className="text-red-600 hover:text-red-800 ml-2"
                  title="Delete Transaction"
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={handleReset}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
          >
            Reset All
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
