import { useState, useEffect } from "react";
import { IBudget } from "../types";
import ProgressBar from "./ProgressBar";

export default function Display({budgets, currentBudget}: {budgets: IBudget[], currentBudget: IBudget}){
    const allBudgets = budgets;
    const [CurrentBudget, setCurrentBudget] = useState<IBudget>();
    
    // const totalExpenses = budget.expenses.reduce((total, category) => {
    //     category.expenses.forEach(expense => {
    //         total += expense.cost;
    //     });
    //     return total;
    // }, 0);
    useEffect(() => {
        setCurrentBudget(currentBudget)
    }, []);
   
    return(
        <div>
            
            <div className="container mx-auto mt-8 border border-gray-400 rounded-md overflow-hidden sm:w-1/2 lg:w-3/4 h-5/6">
            <h1 className="text-2xl font-bold bg-gray-100 p-4 mb-4">Latest Budget Monitor</h1>
            <h1 className="text-2xl font-bold p-4 mb-4">{CurrentBudget?._title}</h1>

                <ul className="list-inside">
                <h2 className="text-lg font-medium p-4 mb-2">Total Budget: spent ${CurrentBudget?._current} out of ${CurrentBudget?._budget}</h2>
            <div className="p-4"><ProgressBar completed={Math.ceil((CurrentBudget?._current? CurrentBudget._current / CurrentBudget._budget: 0) * 100)} /></div>
                {CurrentBudget?.expenses.map((category) => {
                    
                    let percentAmount = (category.current / category.budget) * 100
                    

                    // maybe calculate the amount spent?
                    // const categoryClasses = ["p-4", "flex", "justify-between", index % budget.expenses.length === 0 ? "bg-red-200" : index % budget.expenses.length === 1 ? "bg-green-200" : index % budget.expenses.length === 2 ? "bg-yellow-200" : index % budget.expenses.length === 3 ? "bg-orange-200" : index % budget.expenses.length === 4 ? "bg-purple-200" : index % budget.expenses.length === 5 ? "bg-blue-200" : "bg-pink-200", "relative",];
                    return (
                        <div>
                        <h1 className="text-2xl font-bold p-4 mb-4">Expenses</h1>
                        <li key={category.category} className="p-4">
                            <div className="flex flex-row">
                            <h3 className="text-lg font-medium mb-2">
                                {category.category}: spent ${category.current} out of ${category.budget}
                            </h3>
                            </div>
                            <ProgressBar completed={Math.floor(percentAmount)} />
                        </li>
                        </div>
                    );
                })}
                    </ul>
            
            
            
            </div>
        </div>

    )
}