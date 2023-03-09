import React from "react";
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
    return(
        <div>Expenses Page</div>
    )
}

