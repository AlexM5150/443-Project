import React, { useState } from "react";
import { IBudget, ICategoryStates } from "../types";
import Budget from "./Budget";
import Button from "./Button";
import Modal from "./Modal";
import AddBudget from "./AddBudget";
import { Server } from "../tools";
import { useNavigate } from "react-router-dom";

function Budgets({
  budgets,
  isOpen,
  toggleOpen,
  categoryStates,
  toggleCategory,
  modalOpen,
  title,
  amount,
  setModalOpen,
  setTitle,
  setAmount,
  handleDelete,
  setBudgets,
}: {
  budgets: IBudget[];
  isOpen: boolean[];
  toggleOpen: (index: number) => void;
  categoryStates: ICategoryStates;
  toggleCategory: (category: string) => void;
  modalOpen: boolean;
  title: string;
  amount: number;
  setModalOpen: (bool: boolean) => void;
  setTitle: (title: string) => void;
  setAmount: (amount: number) => void;
  handleDelete: (id: string, key: number) => void;
  setBudgets: (value: React.SetStateAction<IBudget[]>) => void;
}) {
  const [id, setId] = useState("");

  const navigation = useNavigate();

  const handleOpenModal = (budgetId: string) => {
    setId(budgetId);
    setModalOpen(true);
  };

  const [showAddBudget, setShowAddBudget] = useState(false);

  const resetBudget = async (budgetId: string) => {
    const { error } = await Server.put<IBudget[]>(`/user/budget/reset?id=${budgetId}`, {
      _budget: amount,
      _title: title,
      _id: id,
    });

    if (error) return;
    window.location.reload();
  };

  async function addBudget(title: string, amount: number) {
    // Make API call to add a new budget
    const { error } = await Server.post<IBudget[]>("/user/budget", {
      _budget: amount,
      _title: title,
      _id: id,
    });

    if (error) return;
    window.location.reload();
  }

  return (
    <div className="flex w-full space-y-4 flex-col items-center">
      {budgets &&
        budgets.map((budget, key) => {
          return (
            <div key={key} className="flex flex-row sm:w-1/2 lg:w-3/4 space-x-4">
              <div className="container mx-auto mt-4 border rounded-md overflow-hidden">
                <Budget
                  key={key}
                  budget={budget}
                  isOpen={isOpen[key]}
                  toggleOpen={() => toggleOpen(key)}
                  categoryStates={categoryStates}
                  toggleCategory={toggleCategory}
                />
              </div>
              <div className="space-y-5 flex flex-col items-center justify-center flex-1">
                <Button title={"Update"} onClick={() => handleOpenModal(budget._id)} type="button" />
                <Button title={"Delete"} onClick={() => handleDelete(budget._id, key)} type="button" />
                <Button title={"Reset"} onClick={() => resetBudget(budget._id)} type="button" />
              </div>
            </div>
          );
        })}
      <div className="flex justify-center flex-col items-center">
        <Button onClick={() => setShowAddBudget(true)} title={"Add Budget"} type={"button"} />

        {showAddBudget && (
          <AddBudget
            onCreate={(title, amount) => {
              addBudget(title, amount);
              setShowAddBudget(false);
            }}
            onCancel={() => setShowAddBudget(false)}
          />
        )}
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        titleLabel={"Title"}
        title={title}
        onTitleChange={(event) => setTitle(event.target.value)}
        amountLabel={"Budget"}
        amount={amount.toString()}
        onAmountChange={(event) => setAmount(parseInt(event.target.value))}
        id={id}
        setBudgets={setBudgets}
        budgets={budgets}
      />
    </div>
  );
}

export default Budgets;
