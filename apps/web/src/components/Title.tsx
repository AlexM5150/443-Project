function Title({ title, onClick }: { title: string, onClick: () => void }) {
    return (
        <div className="text-2xl font-bold p-4 mb-4" onClick={onClick}>
            {title}
        </div>
    );
}

export default Title;