import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IError } from "../types";
import Server from "../tools/Server";
import { Button, Notification } from "../components";
import { useState } from "react";
import Navbar from "../components/NavBar";
import e from "cors";

function EditExpense() {
  const navigation = useNavigate();
  const [show, setShow] = useState<IError>({ message: "", active: false });
  const { state } = useLocation();
  const { title, cost, category_id, id, budget_id } = state;
  const [titleName, setTitle] = useState(title);
  const [costs, setCost] = useState(cost);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const { category, title, cost, id, expense } = form.elements as typeof form.elements & {
      category: HTMLInputElement;
      title: HTMLInputElement;
      cost: HTMLInputElement;
      id: HTMLInputElement;
      expense: HTMLInputElement;
    };

    const { error } = await Server.put(`/user/budget/category/expenses`, {
      category: category.value.trim(),
      title: title.value.trim(),
      cost: cost.value.trim(),
      id: id.value.trim(), //budget id
      expense: expense.value.trim(),
    });
    if (error) return setShow(error);
    navigation("/budgets");
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8 border border-gray-400 rounded-md overflow-hidden sm:w-1/2 lg:w-3/4 h-5/6">
        <div className="text-center text-2xl mb-2 mt-2 justify-center items-center content-center">Edit Expense</div>
        <div className="h-96 flex justify-evenly border border-t-gray-400">
          <form className="row-span-4 flex mt-4" onSubmit={handleSubmit}>
            {/* <DropDownMenu /> */}
            <input type="hidden" id="category" value={category_id}></input>
            <input type="hidden" id="id" value={budget_id}></input>
            <input type="hidden" id="expense" value={id}></input>

            <div className="px-2">
              <label className="text-sm flex mb-1">Name</label>
              <input
                autoComplete="off"
                onChange={(e) => setTitle(e.target.value)}
                required
                id="title"
                type="text"
                value={titleName}
                className="w-full py-1.5 leading-loose px-2"
              />
            </div>
            {/* ensure that AMOUNT does not allow a negative number */}
            <div className="px-2">
              <label className="text-sm flex mb-1">Amount</label>
              <input
                autoComplete="off"
                onChange={(e) => setCost(e.target.value)}
                required
                id="cost"
                value={costs}
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
export default EditExpense;
