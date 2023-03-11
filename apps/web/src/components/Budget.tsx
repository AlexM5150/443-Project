import Title from "./Title";
import Category from "./Category"
import Expenses from "./Expenses"
import { IBudget, ICategoryStates } from "../types"

function Budget({ budget, isOpen, toggleOpen, categoryStates, toggleCategory }: { budget: IBudget, isOpen: boolean, toggleOpen: () => void, categoryStates: ICategoryStates, toggleCategory: (category: string) => void }) {
    return (
        <div>
            <Title title={budget._title} budget={budget._budget} onClick={toggleOpen} />
            {isOpen && (
                <>
                    {budget.expenses.map((category, key) => {
                        const showExpenses = categoryStates[category._id];
                        return (
                            <div key={key} className="border border-gray-200">
                                <Category
                                    category={category.category}
                                    budget={category.budget}
                                    current={category.current}
                                    onClick={() => toggleCategory(category._id)}
                                />
                                {showExpenses &&
                                    category.expenses.map((expense, key) => (
                                        <Expenses key={key} title={expense.title} cost={expense.cost} />
                                    ))}
                            </div>
                        );
                    })}
                    <div className="bg-gray-200 p-4">
                        <h2 className="text-lg font-medium mb-2">Total Expenses: ${budget._current}</h2>
                    </div>
                </>
            )}
        </div>
    );
}

export default Budget