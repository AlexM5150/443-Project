import React from "react";
import { IError } from "../types";
import { MdClose } from "react-icons/md";

interface INotification {
  display: [show: IError, setShow: React.Dispatch<React.SetStateAction<IError>>];
}

export default function Notification({ children, display }: React.PropsWithChildren<INotification>) {
  const [show, setShow] = display;
  return (
    <div className="fixed inset-x-0 bottom-6 flex justify-center">
      <div
        className={`transition-all bg-red-500 px-4 py-2 rounded-md inline-flex space-x-2 items-center duration-700 ${
          show.active ? "opacity-100" : "opacity-0"
        }`}>
        <span>{show.msg}</span>
        <button className="" onClick={() => setShow({ ...show, active: false })}>
          {children ? children : <MdClose className="w-7 h-7 hover:scale-110" />}
        </button>
      </div>
    </div>
  );
}
