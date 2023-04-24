import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import { IBudget, IError } from "../types";
import Server from "../tools/Server";
import { Button, Notification } from "../components";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const { state } = useLocation();
  const { budget_id, title } = state;
  const [show, setShow] = useState<IError>({ message: "", active: false });
  const [budget, setBudget] = useState<IBudget>();
  const navigation = useNavigate();

  useEffect(() => {
    getBudget(budget_id);
  }, []);

  const getBudget = async (budget_id: string) => {
    const { response } = await Server.get<IBudget>(`/user/budget?id=${budget_id}`);
    setBudget(response as IBudget);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const { category, budget, id } = form.elements as typeof form.elements & {
      category: HTMLInputElement;
      budget: HTMLInputElement;
      id: HTMLInputElement;
    };
    const { error } = await Server.post(`/user/budget/category`, {
      category: category.value.trim(),
      budget: Number(budget.value.trim()),
      id: id.value.trim(),
    });
    if (error) return setShow(error);
    navigation("/budgets");
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8 border border-gray-400 rounded-md overflow-hidden sm:w-1/2 lg:w-3/4 h-5/6">
        <div className="text-center text-2xl mb-2 mt-2 justify-center items-center content-center">
          Add category to budget: {title}
        </div>
        <div className="h-96 border border-t-gray-400">
          <form className="flex mt-4 items-center justify-center" onSubmit={handleSubmit}>
            <input type="hidden" id="id" value={budget_id}></input>
            <div className="px-2">
              <label className="text-sm flex mb-1">Name</label>
              <input
                autoComplete="off"
                required
                id="category"
                type="text"
                placeholder="Food"
                className="w-full py-1.5 leading-loose px-2"
              />
            </div>
            {/* ensure that AMOUNT does not allow a negative number */}
            <div className="px-2">
              <label className="text-sm flex mb-1">Amount</label>
              <input
                autoComplete="off"
                required
                id="budget"
                placeholder="50"
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
