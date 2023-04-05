import { AiTwotoneEdit, AiTwotoneDelete } from "react-icons/ai";
function Expenses({ title, cost }: { title: string, cost: number }) {
    return (
        <div className="flex flex-row justify-between">
            <div className="flex justify-between">
            <h1 className="font-medium p-2">{title} ${cost}</h1>
            {/* deric handle these two. editing an expense and deleting an expense*/}
            <button>
                <AiTwotoneEdit className="w-6 h-7 "></AiTwotoneEdit>
            </button>
            <button>
                <AiTwotoneDelete className="w-6 h-7"></AiTwotoneDelete>
            </button>
            </div>
        </div>
    );
}

export default Expenses