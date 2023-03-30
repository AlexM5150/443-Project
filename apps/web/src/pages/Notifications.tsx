import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import { IError } from "../types";
import Server from "../tools/Server";
import { Notification } from "../components";
// sample budget
const budget = {
    _id: "6406b020c9301e0eb3bfef94",
    _user: "6406125e32cc81699ab4c446",
    _current: 15,
    _budget: 1000,
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

// Created by Dylan Huynh and Deric Cheng
export default function Expenses() {
    const [show, setShow] = useState<IError>({ message: "", active: false });
    const [UserBudget, setUserBudget] = useState<{ _id: string; _user: string; _current: number; _budget: number; _title: string; expenses: { _id: string; category: string; budget: number; expenses: { title: string; cost: number; category: string; created: string; _id: string; }[]; }[]; }>();

    useEffect(() => {
        setUserBudget(budget)
    },[])
    // variable that calculates the total amount we spent on our expenses so far
    const totalExpenses = budget.expenses.reduce((total, category) => {
        category.expenses.forEach(expense => {
            total += expense.cost;
        });
        return total;
    }, 0);

    /**
     * react component that simulates a progress bar
     * @param props the completed percetentage to fill the progress bar
     * @returns react component
     */
    const ProgressBar = (props: {completed: number}) => {
        const completed = props;
        let color = 'blue'
        if (completed.completed < 25){
            color = 'green'
        }
        else if (completed.completed > 85){
            color = 'red'
        }
        // container styles sheet
        const container= {
            height: 25,
            width: '90%',
            backgroundColor: 'gray',
            borderRadius: 50,
            margin: 50
        }
        // percentage style sheet
        const percentFilled: any = {
            height: '100%',
            width: `${completed.completed}%`,
            backgroundColor: `${color}`,
            borderRadius: 'inherit',
            textAlign: 'center',
            
        }
        // percentage lable style sheet
        const label = {
            padding: 5,
            color: 'white',
            fontWeight: 'bold',
            
        }
        return(
            <div style={container}>
                <div style={percentFilled}>
                    <span style={label}>{`${completed.completed}%`}</span>
                </div>
            </div>
        )
    }
    return(
        <div>
            <Navbar />
            <div className="container mx-auto mt-8 border border-gray-400 rounded-md overflow-hidden sm:w-1/2 lg:w-3/4 h-5/6">
            <h1 className="text-2xl font-bold bg-gray-100 p-4 mb-4">Budget Monitor</h1>
            <h2 className="text-lg font-medium p-4 mb-2">Total Budget: ${budget._budget}</h2>
            <div className="p-4"><ProgressBar completed={Math.ceil((totalExpenses / budget._budget) * 100)} /></div>
            
            <ul className="list-inside">
                {budget.expenses.map((category) => {
                    let total = 0
                    category.expenses.forEach(expense => {
                        total += expense.cost
                    })
                    let percentAmount = (total / category.budget) * 100
                    

                    // maybe calculate the amount spent?
                    // const categoryClasses = ["p-4", "flex", "justify-between", index % budget.expenses.length === 0 ? "bg-red-200" : index % budget.expenses.length === 1 ? "bg-green-200" : index % budget.expenses.length === 2 ? "bg-yellow-200" : index % budget.expenses.length === 3 ? "bg-orange-200" : index % budget.expenses.length === 4 ? "bg-purple-200" : index % budget.expenses.length === 5 ? "bg-blue-200" : "bg-pink-200", "relative",];
                    return (
                        <li key={category.category} className="p-4">
                            <div className="flex flex-row">
                            <h3 className="text-lg font-medium mb-2">
                                {category.category}: ${category.budget}
                            </h3>
                            </div>
                            <ProgressBar completed={Math.ceil(percentAmount)} />
                        </li>
                    );
                })}
                    </ul>
            
            
            <Notification display={[show, setShow]} />
            </div>
        </div>

    )
}