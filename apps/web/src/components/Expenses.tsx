function Expenses({ title, cost }: { title: string, cost: number }) {
    return (
        <div className="flex flex-row justify-between">
            <h1 className="font-medium p-2">{title} ${cost}</h1>
        </div>
    );
}

export default Expenses