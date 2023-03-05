import React from "react";

interface IButton {
  title: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset" | undefined;
  callback?: () => void;
}

export default function Button({ title, onClick, type, callback, children }: React.PropsWithChildren<IButton>) {
  return (
    <button onClick={onClick || callback} className="bg-[#FFC72A] py-2 px-3 rounded hover:scale-105" type={type}>
      {title}
      {children}
    </button>
  );
}
