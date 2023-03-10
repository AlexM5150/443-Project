import React from "react";
import Navbar from "../components/NavBar";
export default function Expenses() {
    // get a list of categories by calling the API
    // if no categories exist, the user cannot create an expense so check for that
    // once we get a list of categories we can create a form
    // form will have: expense_name, expense_amount, category
    // once the user submits, check to see if we can add the category to the budget
    
    // IDEA:
    // maybe take the amount paramter and checks to see if it goes over budget by calling the api and
    //  calcuating the total budget
    // IF new_total_amount > total_budget: reject that budget and send a notification to the user
    // that the budget will go over if we add the expense
    // flex flex-col items-center justify-center
    return(
        <div>
            <Navbar />
            <div className="container mx-auto mt-14 border border-gray-400 rounded-md overflow-hidden sm:w-1/2 lg:w-3/4">
                <div className="bg-slate-500 h-96 grid justify-items-start">
                    <div><p className="text-xl text-slate-200">Expense</p></div>
                </div>
                
            </div>
        </div>

    )
}