import React, { useState, ChangeEvent, FormEvent } from "react";
import Button from "./Button";

interface AddBudgetProps {
  onCreate: (title: string, amount: number) => void;
}

function AddBudget({ onCreate }: AddBudgetProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onCreate(title, Number(amount));
    setTitle("");
    setAmount("");
  };

  return (
    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
      <form onSubmit={handleSubmit} className="items-center inline-flex space-x-4">
        <h3 className="text-xl font-bold mx-4">Create a budget:</h3>
        <div>
          <label htmlFor="input1" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="input1"
            id="input1"
            required
            className="w-full leading-loose px-2"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="">
          <label htmlFor="input2" className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            name="input2"
            id="input2"
            required
            className="w-full leading-loose px-2"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>
        <div className="mt-4 inline-flex space-x-4">
          <Button type="submit" title="Create" />
        </div>
      </form>
    </div>
  );
}

export default AddBudget;
