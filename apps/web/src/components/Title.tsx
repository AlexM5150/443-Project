function Title({ title, budget, onClick }: { title: string, budget: number, onClick: () => void }) {
    return (
        <div className="flex justify-between flex-row bg-gray-200 cursor-pointer" onClick={onClick}>
            <div className="text-2xl font-bold p-4 mb-4">
                {title}
            </div>
            <h2 className="text-2xl font-bold p-4">Budget: ${budget}</h2>
        </div>
    );
}

export default Title;