import React, { useState } from 'react'
import { IBudget, ICategoryStates } from "../types";
import Budget from "./Budget"
import Button from "./Button";
import Modal from "./Modal";
import AddBudget from "./AddBudget";

function Budgets({ budgets, isOpen, toggleOpen, categoryStates, toggleCategory, modalOpen, title, amount, setModalOpen, setTitle, setAmount, handleDelete, setBudgets }: {
    budgets: IBudget[], isOpen: boolean[], toggleOpen: (index: number) => void, categoryStates: ICategoryStates, toggleCategory: (category: string) => void, modalOpen: boolean, title: string, amount: number, setModalOpen: (bool: boolean) => void, setTitle: (title: string) => void, setAmount: (amount: number) => void, handleDelete: (id: string, key: number) => void, setBudgets: (value: React.SetStateAction<IBudget[]>) => void
}) {

    const [id, setId] = useState('');
    
    const handleOpenModal = (budgetId: string) => {
        setId(budgetId);
        setModalOpen(true);
    };
    
    const [showAddBudget, setShowAddBudget] = useState(false);

    const resetBudget = async (budgetId: string) => {
        // Make API call to reset the current budget by its ID
        // need to implement the API endpoint on the server-side as well
        const response = await fetch(`/api/budget/reset/${budgetId}`, {
          method: 'PUT',
        });
      
        if (response.ok) {
          // Update the budgets state after the reset
          const updatedBudgets = await response.json();
          setBudgets(updatedBudgets);
        }
      };
      
    async function addBudget(title: string, amount: number) {
    // Make API call to add a new budget
    const response = await fetch('/api/budget', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, amount }),
    });
    
    if (response.ok) {
        // Update the budgets state after the reset
        const updatedBudgets = await response.json();
        setBudgets(updatedBudgets);
    }
    }
      
    return (
        <div className="flex w-full space-y-4 flex-col">
            {budgets &&
                budgets.map((budget, key) => {
                    return (
                        <div key={key} className="flex flex-row items-center">
                            <div className="container mx-auto mt-4 border border-gray-400 rounded-md overflow-hidden sm:w-1/2 lg:w-3/4">
                                <Budget
                                    key={key}
                                    budget={budget}
                                    isOpen={isOpen[key]}
                                    toggleOpen={() => toggleOpen(key)}
                                    categoryStates={categoryStates}
                                    toggleCategory={toggleCategory}
                                />
                            </div>
                            <div className="mx-2 space-x-5">
                                <Button title={'Update'} onClick={() => handleOpenModal(budget._id)} type="button" />
                                <Button title={'Delete'} onClick={() => handleDelete(budget._id, key)} type='button' />
                                <Button title={'Reset'} onClick={() => resetBudget(budget._id)} type='button' />
                            </div>

                        </div>
                    );
                }
                )}
                 //new updated part
            <button
              onClick={() => setShowAddBudget(true)}
              className="bg-blue-600 text-white py-2 px-4 rounded-md mt-4"
            >
              Add Budget
            </button>

            {showAddBudget && (
              <AddBudget
                onCreate={(title, amount) => {

                  addBudget(title, amount);
                  setShowAddBudget(false);
                }}
                onCancel={() => setShowAddBudget(false)}
              />
            )}
            
                    
                
            <Modal
                isOpen={modalOpen}
                onClose={() => {setModalOpen(false)}}
                titleLabel={"Title"}
                title={title}
                onTitleChange={(event) => setTitle(event.target.value)}
                amountLabel={"Budget"}
                amount={amount.toString()}
                onAmountChange={(event) => setAmount(parseInt(event.target.value))}
                id={id} 
                setBudgets={setBudgets} 
                budgets={budgets} 
                onAddBudget = {addBudget}
            />
        </div>
    );
}

export default Budgets
