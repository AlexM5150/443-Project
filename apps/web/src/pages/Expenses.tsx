import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import { IError } from "../types";
import Server from "../tools/Server";
import { Notification } from "../components";
// Created by Dylan Huynh and Deric Cheng
export default function Expenses() {
    const [show, setShow] = useState<IError>({ message: "", active: false });
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
            {value: '00000', label: "Food"},
            {value: '00001', label: "Gas"},
            {value: '00002', label: "Travel"},
            {value: '00003', label: 'Shoes'},
            {value: '00004', label: 'Dessert'},
            {value: '00005', label: 'Video Games'}
        ];

        setCategories(category)
    }, [])



    /**
     * Custom Component for a dropdown menu of the categories
     * @returns a react component
     */
    const DropDownMenu = () => {
        /**
         * render the drop down menu
         */
        useEffect(() => {
            PopulateDropDown()
        })

        /**
         * method that populates the drop down menu for the categories
         * @returns a React component that renders the drop down menu based off the amount of categories in the db
         */
        const PopulateDropDown = () => {
            return(
                <div className="px-2">
                    <label className="text-sm flex mb-1">Category</label>
                    
                    <select name="category" required className="p-2 my-1.5 overflow-y-auto">
                        {categories.map(option => (
                            <option className="p-1 cursor-pointer" key={option.value} value={option.value}>{option.label}</option>
                        ))}

                    </select>
                    
                    
                </div>
            )
        }
        return(
            <div>{PopulateDropDown()}</div>
        )
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const {category, title, cost} = form.elements as typeof form.elements & {
            category: HTMLInputElement;
            title: HTMLInputElement;
            cost: HTMLInputElement;
        }
        // use an API call here to create an expense.
        // follow what Carlos did in App.tsx. also find a way to auto generate ID's
    }

    return(
        <div>
            <Navbar />
            <div className="container mx-auto mt-8 border border-gray-400 rounded-md overflow-hidden sm:w-1/2 lg:w-3/4 h-5/6">
                <div className="text-center text-2xl mb-2 mt-2 justify-center items-center content-center">Add Expense</div>
                <div className="h-96 flex justify-evenly border border-t-gray-400">
                    <form className="row-span-4 flex mt-4" onSubmit={handleSubmit}>
                        
                        <DropDownMenu/>
                        
                        
                        
                        <div className="px-2">
                        <label className="text-sm flex mb-1">Name</label>
                        <input
                            autoComplete="off"
                            required
                            id="title"
                            type="text"
                            placeholder="Pizza"
                            className="w-full py-1.5 leading-loose px-2"
                        />
                        </div>
                        {/* ensure that AMOUNT does not allow a negative number */}
                        <div className="px-2">
                            <label className="text-sm flex mb-1">Amount</label>
                            <input
                            autoComplete="off"
                            required
                            id="cost"
                            placeholder="4.99"
                            className="w-full py-1.5 leading-loose px-2"
                            type="number"
                            min = "0"
                            />
                            
                        </div>
                        <div className="px-2">
                        <input type="submit" value="Submit" className="border"/>
                        </div>
                        

                        
                    </form>
                </div>
            <Notification display={[show, setShow]} />
            </div>
        </div>

    )
}