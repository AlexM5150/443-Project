import React from "react";

// interface IButton {
//   title: string;
//   onClick?: React.MouseEventHandler<HTMLButtonElement>;
//   type?: "button" | "submit" | "reset" | undefined;
//   callback?: () => void;
// }

// export default function Button({ title, onClick, type, callback, children }: React.PropsWithChildren<IButton>) {
//   return (
//     <button onClick={onClick || callback} className="bg-[#FFC72A] py-2 px-3 rounded hover:scale-105" type={type}>
//       {title}
//       {children}
//     </button>
//   );
// }



interface ButtonProps {
  title: string;
  onClick?: () => void;
  type: "button" | "submit" | "reset";
  reset?: boolean;
  children?: React.ReactNode; //optional children props
}

const Button: React.FC<ButtonProps> = ({ title, onClick, type, reset, children }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {title}
      {children}
    </button>
  );
};


export default Button;
