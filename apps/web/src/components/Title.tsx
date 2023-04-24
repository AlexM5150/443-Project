import { useNavigate } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";

function Title({ title, budget, id, onClick }: { title: string; budget: number; id: string; onClick: () => void }) {
  const navigation = useNavigate();
  return (
    <div className="flex justify-between flex-row bg-gray-200 cursor-pointer" onClick={onClick}>
      <div className="text-2xl font-bold p-4 mb-4 flex items-center">
        <span className="mr-2">{title}</span>
        <button
          className=""
          onClick={() => {
            navigation("/categories", { state: { budget_id: id, title } });
          }}>
          <AiOutlinePlusCircle className="w-6 h-7" />
        </button>
      </div>
      <h2 className="text-2xl font-bold p-4">Budget: ${budget}</h2>
    </div>
  );
}

export default Title;
