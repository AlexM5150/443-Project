import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { Server } from '../tools'
import { Budgets } from "../components"
import { IBudget, ICategoryStates } from "../types"

function BudgetPage() {

    const [budgets, setBudgets] = useState<IBudget[]>([]);
    const [categoryStates, setCategoryStates] = useState<ICategoryStates>({});
    const [isOpen, setIsOpen] = useState<boolean[]>([]);

    useEffect(() => {
        const getBudget = async () => {
            const { response } = await Server.get<IBudget[]>("/user/budget");
            setBudgets(response as IBudget[])
            console.log(budgets)
        }
        getBudget();
    }, []);

    const toggleOpen = (index: number) => {
        const newIsOpen = [...isOpen];
        newIsOpen[index] = !newIsOpen[index];
        setIsOpen(newIsOpen);
    };

    const toggleCategory = (category: string) => {
        setCategoryStates({
            ...categoryStates,
            [category]: !categoryStates[category]
        });
    };

    return (
        <div>
            <NavBar />
            <div className="flex justify-center items-center mt-5">
                <Budgets budgets={budgets} isOpen={isOpen} toggleOpen={toggleOpen} categoryStates={categoryStates} toggleCategory={toggleCategory} />
            </div>
        </div>
    );
}

export default BudgetPage;

