import { useState, useEffect } from "react";
import { IBudget } from "../types";
import ProgressBar from "./ProgressBar";

/**
 * visually represent the amount spent on a budget and its categories
 * @param param0 budget: the list of budgets for a user, currentBudget: the current budget we want to display
 * @returns a react component consisting of Progress Bars
 */
export default function Display({budgets, currentBudget}: {budgets: IBudget[], currentBudget: IBudget}){
    // const allBudgets = budgets;
    const [CurrentBudget, setCurrentBudget] = useState<IBudget>();
    useEffect(() => {
        setCurrentBudget(currentBudget)
    }, []);
   
    /** div containing the amount spent on the total budget and all categories as progress bars */
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