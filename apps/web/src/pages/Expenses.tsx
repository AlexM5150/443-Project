import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
export default function Expenses() {

    const [categories, setCategories] = useState<{value: string; label: string}[]>([{value:"", label:""}]);
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



    /**
     * sets the list of categories called from the api to the "categories" state
     * @returns Default Category Item
     */
    useEffect(() => {
        // make the api call here?
        const category = [
            {value: 'food', label: "Food"},
            {value: 'gas', label: "Gas"},
        ];

        setCategories(category)
    }, [])



    /**
     * Custom Component for a dropdown menu of the categories
     * @returns a react component
     */
    const DropDownMenu = () => {
        const [preview, setpreview] = useState<string>('category');
        const [showMenu, setShowMenu] = useState<boolean>(false);


        useEffect(() => {
            PopulateDropDown()
        })

        const handleChange = (value: string) => {
            setpreview(value)
        }

        const PopulateDropDown = () => {
            return(
            <div className="text-left border boreder-gray-400" >
                <div className="p-1 items-center justify-between select-none w-32" onClick={() => setShowMenu(!showMenu)}>
                    {preview}
                </div>
                {showMenu && (<div className="border max-h-40 overflow-auto rounded">
                        {categories.map(option => (
                            <div key={option.value} className="p-1 cursor-pointer hover:bg-gray-200"
                            onClick={() => handleChange(option.label)}> {option.label} </div>
                        ))}
                    </div>)}
            </div>
            )
        }
        return(
            <div>{PopulateDropDown()}</div>
        )
    }
    const handleSubmit = () => {

    }

    return(
        <div>
            <Navbar />
            <div className="container mx-auto mt-8 border border-gray-400 rounded-md overflow-hidden sm:w-1/2 lg:w-3/4 h-5/6">
                <div className="text-center text-2xl mb-2 mt-2 justify-center items-center content-center">Add Expense</div>
                <div className="h-96 flex justify-evenly border border-t-gray-400">
                    <form className="row-span-4 space-y-2 flex" onSubmit={handleSubmit}>
                        <div>
                            <DropDownMenu />
                        </div>
                        <div className="px-2">
                        <label className="text-sm flex mb-1">Name</label>
                        <input
                            autoComplete="off"
                            required
                            id="expense_name"
                            type="text"
                            placeholder="Pizza"
                            className="w-full py-1.5 leading-loose px-2"
                        />
                        </div>
                        <div className="px-2">
                            <label className="text-sm flex mb-1">Amount</label>
                            <input
                            autoComplete="off"
                            required
                            id="amount"
                            placeholder="4.99"
                            className="w-full py-1.5 leading-loose px-2"
                            type="number"
                            min = "0"
                            
                            />
                            
                        </div>


                        
                    </form>
                </div>
                
            </div>
        </div>

    )
}