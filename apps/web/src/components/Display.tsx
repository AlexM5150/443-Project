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

    /**
     * a method that checks the deadline of the passed in budget
     * Created by Dylan Huynh
     * @param budget the budget we want to check the deadline with
     * @returns a react component that displays when the budget expires
     */
    const checkDeadline = (budget: IBudget) => {
        // gets the date we created our budget and creates a variable 1 month ahead of that date
        const budgetDate = new Date(budget.created)
        let monthAhead = new Date(budget.created);
        monthAhead.setMonth(budgetDate.getMonth() + 1)
        
        // get the current date and the difference between current date and the month ahead date
        const currentDate = new Date()
        const different_time = monthAhead.getTime() - currentDate.getTime();
        const difference = new Date(different_time)

        // checks if we go next year
        if (budgetDate.getMonth() + 1 > 12){
            monthAhead.setMonth(0)
            monthAhead.setFullYear(monthAhead.getFullYear() + 1)  
        }

        // as long as the difference is > 0, our budget did not expire
        if(difference.getDate() > 0){
            return(
                <div >
                <p className="font-medium p-4 mb-2">Your budget created on: {budgetDate.toDateString()} expires next month on: {monthAhead.toDateString()}</p>
                <p className="font-medium p-4 mb-2">{difference.getDate()} days until your budget resets.</p>
                
                </div>
            )
        }
        // difference < 0, our budget expired
        return(
            <div>
                <p className="font-medium p-4 mb-2">Your budget created on: {budgetDate.toDateString()} expires next month on: {monthAhead.toDateString()}</p>
                <p className="font-medium p-4 mb-2">Please create a new budget</p>
            </div>
        )
    }
    
    /** div containing the amount spent on the total budget and all categories as progress bars */
    return(
        <div>
            
            <div className="container mx-auto mt-8 border border-gray-400 rounded-md overflow-hidden sm:w-1/2 lg:w-3/4 h-5/6">
                <h1 className="text-2xl font-bold bg-gray-100 p-4 mb-4">Latest Budget Monitor</h1>
                <h1 className="text-2xl font-bold p-4 mb-4">{CurrentBudget?._title}</h1>
                {checkDeadline(CurrentBudget? CurrentBudget : budgets[budgets.length - 1])}

                

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