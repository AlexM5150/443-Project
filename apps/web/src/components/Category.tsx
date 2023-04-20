import { AiOutlinePlusCircle } from "react-icons/ai";
// import { AiTwotoneEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
function Category({ category, category_id, budget, budget_id, current, onClick }: { category: string, category_id: string, budget: number, budget_id: string, current: number, onClick: () => void }) {
    const navigation = useNavigate();
    return (
        <div className="flex flex-row justify-between">
            <div className="flex justify-between">
            <button className="text-lg font-medium mb-2" onClick={onClick}>
                <h1 className="text-2xl font-bold p-2">{category}</h1>
            </button>
            <button className="">
                <AiOutlinePlusCircle className="w-6 h-7 " onClick={() => {navigation('/expense', {state: {budget_id: budget_id, category_id: category_id}});}}/>
            </button>
            {/* <button>
                <AiTwotoneEdit className="w-6 h-7 " />
            </button> */}
            </div>
            <div className="flex-col items-center justify-center flex">
                <h2 className="text-lg font-medium p-2">Budget: ${budget}</h2>
                <h2 className="text-lg font-medium p-2">Expenses: ${current.toFixed(2)}</h2>
            </div>
        </div>
    );
}

export default Category