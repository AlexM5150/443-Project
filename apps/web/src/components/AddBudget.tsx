import React, { useState, ChangeEvent, FormEvent } from 'react';

interface AddBudgetProps {
  onCreate: (title: string, amount: number) => void;
  onCancel: () => void;
}

function AddBudget({ onCreate, onCancel }: AddBudgetProps) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title && amount) {
      onCreate(title, Number(amount));
      setTitle('');
      setAmount('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        id="title"
        value={title}
        onChange={handleTitleChange}
      />

      <label htmlFor="amount">Amount</label>
      <input
        type="number"
        name="amount"
        id="amount"
        value={amount}
        onChange={handleAmountChange}
      />

      <button type="submit">Create Budget</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default AddBudget;
