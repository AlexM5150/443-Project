import { AiTwotoneEdit, AiTwotoneDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { IError } from "../types";
import { useState } from "react";
import Server from "../tools/Server";

function Expenses({
  title,
  cost,
  category_id,
  id,
  budget_id,
}: {
  title: string;
  cost: number;
  category_id: string;
  id: string;
  budget_id: string;
}) {
  const navigation = useNavigate();
  const [show, setShow] = useState<IError>({ message: "", active: false });

  async function deleteExpense(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const { category, expense, id } = form.elements as typeof form.elements & {
      category: HTMLInputElement;
      expense: HTMLInputElement;
      id: HTMLInputElement;
    };

    const { error } = await Server.delete(
      `/user/budget/category/expenses?category=${category.value.trim()}&id=${id.value.trim()}&expense=${expense.value.trim()}`,
    );
    if (error) return setShow(error);
    window.location.reload();

    // use an API call here to create an expense.
    // follow what Carlos did in App.tsx. also find a way to auto generate ID's
  }

  return (
    <div className="flex flex-row justify-between">
      <div className="flex justify-between">
        <h1 className="font-medium p-2">
          {title} ${cost}
        </h1>
        {/* deric handle these two. editing an expense and deleting an expense*/}
        <button>
          <AiTwotoneEdit
            className="w-6 h-7 "
            onClick={() => {
              navigation("/editExpense", {
                state: { title: title, cost: cost, category_id: category_id, id: id, budget_id: budget_id },
              });
            }}></AiTwotoneEdit>
        </button>

        <form onSubmit={deleteExpense}>
          <input type="hidden" id="category" value={category_id}></input>
          <input type="hidden" id="expense" value={id}></input>
          <input type="hidden" id="id" value={budget_id}></input>
          <button type="submit">
            <AiTwotoneDelete className="w-6 h-7"></AiTwotoneDelete>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Expenses;
