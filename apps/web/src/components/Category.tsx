function Category({ category, budget, current, onClick }: { category: string, budget: number, current: number, onClick: () => void }) {
    return (
        <div className="flex flex-row justify-between">
            <button className="text-lg font-medium mb-2" onClick={onClick}>
                <h1 className="text-2xl font-bold p-2">{category}</h1>
            </button>
            <div className="flex-col items-center justify-center flex">
                <h2 className="text-lg font-medium p-2">Budget: ${budget}</h2>
                <h2 className="text-lg font-medium p-2">Expenses: ${current}</h2>
            </div>
        </div>
    );
}

export default Category