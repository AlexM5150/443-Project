import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import { IError } from "../types";
import Server from "../tools/Server";
import { Button, Notification } from "../components";
import { useLocation } from "react-router-dom";
import { ICategory } from "../types";
import { useNavigate } from "react-router-dom";
// Created by Dylan Huynh and Deric Cheng
export default function Expenses() {
  // passed in parameters thru the "UserBudget" page
  const { state } = useLocation();
  const { budget_id, category_id } = state;
  const [show, setShow] = useState<IError>({ message: "", active: false });
  const [category, setCategory] = useState<ICategory>();
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
  const navigation = useNavigate();
  /**
   * sets the list of categories called from the api to the "categories" state
   * @returns Default Category Item
   */
  useEffect(() => {
    // using the passed in parameters to make an API call and set the category
    getBudget(budget_id, category_id);
    // change to ensure that we have 1 category ID and budget ID
  }, []);

  const getBudget = async (budget_id: string, category_id: string) => {
    const { response } = await Server.get<ICategory>(`/user/budget/category?id=${budget_id}&category=${category_id}`);
    setCategory(response as ICategory);
  };

  /**
   * Custom Component for a dropdown menu of the categories
   * @returns a react component
   */
  const DropDownMenu = () => {
    /**
     * render the drop down menu
     */
    useEffect(() => {
      PopulateDropDown();
    });

    /**
     * method that populates the drop down menu for the categories
     * @returns a React component that renders the drop down menu based off the amount of categories in the db
     */
    const PopulateDropDown = () => {
      return (
        <div className="px-2">
          <label className="text-sm flex mb-1">Category</label>
          <p>{category?.category}</p>
        </div>
      );
    };
    return <div>{PopulateDropDown()}</div>;
  };
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const { category, title, cost, id } = form.elements as typeof form.elements & {
      category: HTMLInputElement;
      title: HTMLInputElement;
      cost: HTMLInputElement;
      id: HTMLInputElement;
    };

    const { error } = await Server.post(`/user/budget/category/expenses`, {
      category: category.value.trim(),
      title: title.value.trim(),
      cost: cost.value.trim(),
      id: id.value.trim(),
    });
    if (error) return setShow(error);
    navigation("/budgets");

    // use an API call here to create an expense.
    // follow what Carlos did in App.tsx. also find a way to auto generate ID's
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8 border border-gray-400 rounded-md overflow-hidden sm:w-1/2 lg:w-3/4 h-5/6">
        <div className="text-center text-2xl mb-2 mt-2 justify-center items-center content-center">Add Expense</div>
        <div className="h-96 flex justify-evenly border border-t-gray-400">
          <form className="row-span-4 flex mt-4" onSubmit={handleSubmit}>
            <DropDownMenu />
            <input type="hidden" id="category" value={category_id}></input>
            <input type="hidden" id="id" value={budget_id}></input>

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
                min="0"
              />
            </div>
            <div className="px-2">
              <Button title="Submit" type="submit"></Button>
            </div>
          </form>
        </div>
        <Notification display={[show, setShow]} />
      </div>
    </div>
  );
}