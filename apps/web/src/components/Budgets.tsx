import { IBudget, ICategoryStates } from "../types";
import Budget from "./Budget"

function Budgets({ budgets, isOpen, toggleOpen, categoryStates, toggleCategory }: { budgets: IBudget[], isOpen: boolean[], toggleOpen: (index: number) => void, categoryStates: ICategoryStates, toggleCategory: (category: string) => void }) {
    return (
        <div className="flex w-full space-y-4 flex-col">
            {budgets &&
                budgets.map((budget, key) => {
                    return (
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
                    );
                }
                )}
        </div>
    );
}

export default Budgets