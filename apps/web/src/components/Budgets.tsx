import React, { useState } from 'react'
import { IBudget, ICategoryStates } from "../types";
import Budget from "./Budget"
import Button from "./Button";
import Modal from "./Modal";

function Budgets({ budgets, isOpen, toggleOpen, categoryStates, toggleCategory, modalOpen, title, amount, setModalOpen, setTitle, setAmount, handleDelete, setBudgets }: {
    budgets: IBudget[], isOpen: boolean[], toggleOpen: (index: number) => void, categoryStates: ICategoryStates, toggleCategory: (category: string) => void, modalOpen: boolean, title: string, amount: number, setModalOpen: (bool: boolean) => void, setTitle: (title: string) => void, setAmount: (amount: number) => void, handleDelete: (id: string, key: number) => void, setBudgets: (value: React.SetStateAction<IBudget[]>) => void
}) {

    const [id, setId] = useState('');

    const handleOpenModal = (budgetId: string) => {
        setId(budgetId);
        setModalOpen(true);
    };

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
                                    id={budget._id}
                                />
                            </div>
                            <div className="mx-2 space-x-5">
                                <Button title={'Update'} onClick={() => handleOpenModal(budget._id)} type="button" />
                                <Button title={'Delete'} onClick={() => handleDelete(budget._id, key)} type='button' />
                            </div>

                        </div>
                    );
                }
                )}
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                titleLabel={"Title"}
                title={title}
                onTitleChange={(event) => setTitle(event.target.value)}
                amountLabel={"Budget"}
                amount={amount.toString()}
                onAmountChange={(event) => setAmount(parseInt(event.target.value))}
                id={id} 
                setBudgets={setBudgets} 
                budgets={budgets}            />
        </div>
    );
}

export default Budgets
