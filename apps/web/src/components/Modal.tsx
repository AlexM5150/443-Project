import React, { ChangeEvent, FormEvent, SetStateAction } from "react";
import { Server } from "../tools";
import { IBudget } from "../types";
import Button from "./Button";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  titleLabel: string;
  title: string;
  onTitleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  amountLabel: string;
  amount: string;
  id: string;
  onAmountChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setBudgets: (value: SetStateAction<IBudget[]>) => void;
  budgets: IBudget[];
};

function Modal({
  isOpen,
  onClose,
  titleLabel,
  title,
  onTitleChange,
  amountLabel,
  amount,
  id,
  onAmountChange,
  setBudgets,
  budgets,
}: ModalProps) {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await Server.put<IBudget[]>("/user/budget", {
      _budget: amount,
      _title: title,
      _id: id,
    });
    if (error) return;
    const updatedBudgets = budgets.map((budget) => {
      if (budget._id === id) {
        return {
          ...budget,
          _title: title,
          _budget: Number(amount),
        };
      }
      return budget;
    });
    setBudgets(updatedBudgets);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-30"
              aria-hidden="true"
              onClick={onClose}></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start flex-col items-center">
                <div
                  className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 sm:mx-0 sm:h-10 sm:w-10 cursor-pointer"
                  onClick={onClose}>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>

                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <div className="mt-2">
                    <form onSubmit={handleSubmit} className="flex flex-col items-center">
                      <div>
                        <label htmlFor="input1" className="block text-sm font-medium text-gray-700">
                          {titleLabel}
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="input1"
                            id="input1"
                            className="w-full leading-loose px-2"
                            value={title}
                            onChange={onTitleChange}
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <label htmlFor="input2" className="block text-sm font-medium text-gray-700">
                          {amountLabel}
                        </label>
                        <div className="mt-1">
                          <input
                            type="number"
                            name="input2"
                            id="input2"
                            className="w-full leading-loose px-2"
                            value={amount}
                            onChange={onAmountChange}
                          />
                        </div>
                      </div>

                      <div className="mt-4 inline-flex space-x-4">
                        <Button type="submit" title="Update" />
                        <Button type="button" title="Cancel" onClick={onClose} />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
