function TotalBudget({ budget }: { budget: number }) {
    return (
        <div className="bg-gray-100">
            <h2 className="text-lg font-medium p-4">Total Budget: ${budget}</h2>
        </div>
    );
}

export default TotalBudget