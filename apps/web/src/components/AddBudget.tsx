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
    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
      <div className="mt-2">
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div>
            <label htmlFor="input1" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="input1"
                id="input1"
                className="shadow-sm focus:outline-none focus:ring-[#FFC72A] focus:border-[#FFC72A] block sm:text-sm border-gray-300 rounded-md"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="input2" className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <div className="mt-1">
              <input
                type="number"
                name="input2"
                id="input2"
                className="shadow-sm focus:outline-none focus:ring-[#FFC72A] focus:border-[#FFC72A] block w-full sm:text-sm border-gray-300 rounded-md"
                value={amount}
                onChange={handleAmountChange}
              />
            </div>
          </div>

          <div className="mt-4">
            <button type="submit" className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-[#FFC72A] hover:bg-[#FFC72A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFC72A]">
              Create
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-2 ml-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFC72A]"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBudget;
