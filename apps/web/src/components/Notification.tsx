import React, { useEffect } from "react";
import { IError } from "../types";
import { MdClose } from "react-icons/md";

interface INotification {
  display: [show: IError, setShow: React.Dispatch<React.SetStateAction<IError>>];
}

export default function Notification({ children, display }: React.PropsWithChildren<INotification>) {
  const [show, setShow] = display;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (show.active) timer = setTimeout(() => setShow({ ...show, active: false }), 7 * 1000);
    return () => clearTimeout(timer);
  }, [show, setShow]);

  return (
    <div className="fixed inset-x-0 bottom-6 flex justify-center text-white">
      <div
        className={`transition-all bg-red-500 px-6 py-2 rounded-md inline-flex space-x-4 items-center duration-700
        ${show.active ? "opacity-100" : "opacity-0"}`}>
        <span>{show.message}</span>
        <button className="" onClick={() => setShow({ ...show, active: false })}>
          {children ? children : <MdClose className="w-7 h-7 hover:scale-110" />}
        </button>
      </div>
    </div>
  );
}
