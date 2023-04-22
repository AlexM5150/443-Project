import { useState } from "react";
import { AiOutlinePlusCircle, AiTwotoneDelete } from "react-icons/ai";
import { AiTwotoneEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { IError } from "../types";
import { Server } from "../tools";
function Category({
  category,
  category_id,
  budget,
  budget_id,
  current,
  onClick,
}: {
  category: string;
  category_id: string;
  budget: number;
  budget_id: string;
  current: number;
  onClick: () => void;
}) {
  const navigation = useNavigate();
  const [show, setShow] = useState<IError>({ message: "", active: false });
    async function deleteCategory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const { id, category } = form.elements as typeof form.elements & {
      id: HTMLInputElement;
      category: HTMLInputElement;
    };
    const { error } = await Server.delete(
      `/user/budget/category?id=${id.value.trim()}&category=${category.value.trim()}`,
    );
    if (error) return setShow(error);
    window.location.reload();
    }
    let title = category;
  return (
    <div className="flex flex-row justify-between">
      <div className="flex justify-between">
        <button className="text-lg font-medium mb-2" onClick={onClick}>
          <h1 className="text-2xl font-bold p-2">{category}</h1>
        </button>
        <button className="">
          <AiOutlinePlusCircle
            className="w-6 h-7 "
            onClick={() => {
              navigation("/expense", {
                state: { budget_id: budget_id, category_id: category_id, current: current, budget: budget },
              });
            }}
          />
        </button>
        { <button>
          <AiTwotoneEdit
            className="w-6 h-7 "
            onClick={() => {
              navigation("/editCategory", {
                state: { id: budget_id, category: category_id, title: title, budget: budget, current: current },
              });
            }}></AiTwotoneEdit>
        </button>}
        <form onSubmit={deleteCategory}>
          <input type="hidden" id="id" value={budget_id}></input>
          <input type="hidden" id="category" value={category_id}></input>
          <button type="submit">
            <AiTwotoneDelete className="w-6 h-7"></AiTwotoneDelete>
          </button>
        </form>
            </div>
            <div className="flex-col items-center justify-center flex">
                <h2 className="text-lg font-medium p-2">Budget: ${budget}</h2>
                <h2 className="text-lg font-medium p-2">Expenses: ${current.toFixed(2)}</h2>
            </div>
        </div>
    );
}

export default Category;
