import React, { useState } from 'react';
import NavBar from '../components/NavBar';

const budget = {
    _id: "6406b020c9301e0eb3bfef94",
    _user: "6406125e32cc81699ab4c446",
    _current: 15,
    _budget: 100,
    _title: "March 2023",
    expenses: [
        {
            "_id": "abc",
            "category": "Transport",
            "budget": 200,
            "expenses": [
                {
                    "title": "Rocket pass",
                    "cost": 15,
                    "category": "road to champion",
                    "created": "3/6/2023, 7:32:18\u202fPM",
                    "_id": "6406b043c9301e0eb3bfef97"
                }
            ]
        },
        {
            "_id": "def",
            "category": "Food",
            "budget": 150,
            "expenses": [
                {
                    "title": "Octane blanche",
                    "cost": 15,
                    "category": "road to bronze",
                    "created": "3/6/2023, 7:32:18\u202fPM",
                    "_id": "6406b043c9301e0eb3bfef97"
                },
                {
                    "title": "Octane rouge",
                    "cost": 15,
                    "category": "road to bronze",
                    "created": "3/6/2023, 7:32:18\u202fPM",
                    "_id": "6406b043c9301e0eb3bfef97"
                },
                {
                    "title": "Octane bleue",
                    "cost": 15,
                    "category": "road to bronze",
                    "created": "3/6/2023, 7:32:18\u202fPM",
                    "_id": "6406b043c9301e0eb3bfef97"
                },
                {
                    "title": "Octane blanche",
                    "cost": 15,
                    "category": "road to bronze",
                    "created": "3/6/2023, 7:32:18\u202fPM",
                    "_id": "6406b043c9301e0eb3bfef97"
                },
                {
                    "title": "Octane rouge",
                    "cost": 15,
                    "category": "road to bronze",
                    "created": "3/6/2023, 7:32:18\u202fPM",
                    "_id": "6406b043c9301e0eb3bfef97"
                },
                {
                    "title": "Octane bleue",
                    "cost": 15,
                    "category": "road to bronze",
                    "created": "3/6/2023, 7:32:18\u202fPM",
                    "_id": "6406b043c9301e0eb3bfef97"
                },
                {
                    "title": "Octane blanche",
                    "cost": 15,
                    "category": "road to bronze",
                    "created": "3/6/2023, 7:32:18\u202fPM",
                    "_id": "6406b043c9301e0eb3bfef97"
                },
                {
                    "title": "Octane rouge",
                    "cost": 15,
                    "category": "road to bronze",
                    "created": "3/6/2023, 7:32:18\u202fPM",
                    "_id": "6406b043c9301e0eb3bfef97"
                },
                {
                    "title": "Octane bleue",
                    "cost": 15,
                    "category": "road to bronze",
                    "created": "3/6/2023, 7:32:18\u202fPM",
                    "_id": "6406b043c9301e0eb3bfef97"
                }
            ]
        },
        {
            "_id": "abc",
            "category": "Joga",
            "budget": 200,
            "expenses": [
                {
                    "title": "Rocket pass",
                    "cost": 15,
                    "category": "road to champion",
                    "created": "3/6/2023, 7:32:18\u202fPM",
                    "_id": "6406b043c9301e0eb3bfef97"
                }
            ]
        },
        {
            "_id": "abc",
            "category": "Handball",
            "budget": 200,
            "expenses": [
                {
                    "title": "Rocket pass",
                    "cost": 15,
                    "category": "road to champion",
                    "created": "3/6/2023, 7:32:18\u202fPM",
                    "_id": "6406b043c9301e0eb3bfef97"
                }
            ]
        },
        {
            "_id": "abc",
            "category": "Football",
            "budget": 200,
            "expenses": [
                {
                    "title": "Rocket pass",
                    "cost": 15,
                    "category": "road to champion",
                    "created": "3/6/2023, 7:32:18\u202fPM",
                    "_id": "6406b043c9301e0eb3bfef97"
                }
            ]
        },
        {
            "_id": "abc",
            "category": "Volley",
            "budget": 200,
            "expenses": [
                {
                    "title": "Rocket pass",
                    "cost": 15,
                    "category": "road to champion",
                    "created": "3/6/2023, 7:32:18\u202fPM",
                    "_id": "6406b043c9301e0eb3bfef97"
                }
            ]
        },
    ]
}

interface CategoryStates {
    [index: string]: boolean;
}

function BudgetPage() {

    const [categoryStates, setCategoryStates] = useState<CategoryStates>({});

    const toggleCategory = (category: string) => {
        setCategoryStates({
            ...categoryStates,
            [category]: !categoryStates[category]
        });
    };
    const totalExpenses = budget.expenses.reduce((total, category) => {
        category.expenses.forEach(expense => {
            total += expense.cost;
        });
        return total;
    }, 0);

    return (
        <div>
            <NavBar />
            <div className="flex justify-center items-center mt-5">
                <div className="container mx-auto mt-4 border border-gray-400 rounded-md overflow-hidden sm:w-1/2 lg:w-3/4">
                    <h1 className="text-2xl font-bold bg-gray-100 p-4 mb-4">{budget._title}</h1>
                    <h2 className="text-lg font-medium p-4 mb-2">Total Budget: ${budget._budget}</h2>
                    <ul className="list-inside">
                        {budget.expenses.map((category, index) => {
                            const categoryClasses = ["p-4", "flex", "justify-between", index % budget.expenses.length === 0 ? "bg-red-200" : index % budget.expenses.length === 1 ? "bg-green-200" : index % budget.expenses.length === 2 ? "bg-yellow-200" : index % budget.expenses.length === 3 ? "bg-orange-200" : index % budget.expenses.length === 4 ? "bg-purple-200" : index % budget.expenses.length === 5 ? "bg-blue-200" : "bg-pink-200", "relative",];
                            const showExpenses = categoryStates[category.category];
                            return (
                                <li key={category.category} className={categoryClasses.join(" ")}>
                                    <button
                                        className="text-lg font-medium mb-2"
                                        onClick={() => toggleCategory(category.category)}
                                    >
                                        {category.category}
                                    </button>
                                    {showExpenses && (
                                        <ul className="list-inside ml-4">
                                            {category.expenses.map((expense) => (
                                                <li
                                                    key={expense._id}
                                                    className="flex justify-between mb-2"
                                                >
                                                    <h2 className="text-lg font-medium">
                                                        {expense.title} ${expense.cost.toFixed(2)}
                                                    </h2>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    <h3 className="text-lg font-medium mb-2 ml-auto">
                                        ${category.budget}
                                    </h3>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="bg-gray-100 p-4">
                        <h2 className="text-lg font-medium mb-2">
                            Total Expenses: ${totalExpenses.toFixed(2)}
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default BudgetPage;
