import React, { useState } from "react";
import { IError } from "./types";
import { Server } from "./tools";
import { useNavigate } from "react-router-dom";
import { Button, Notification } from "./components";
import { AiFillEye, AiFillEyeInvisible, AiOutlineSwap } from "react-icons/ai";

function App() {
  const navigation = useNavigate();
  const [visible, setVisible] = useState<boolean>(false);
  const [show, setShow] = useState<IError>({ message: "", active: false });
  const [path, setPath] = useState({ name: "Sign in", url: "sign-in" });

  function handleButtonClick() {
    if (path.url === "sign-in") setPath({ name: "Sign up", url: "sign-up" });
    else setPath({ name: "Sign in", url: "sign-in" });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const { email, password } = form.elements as typeof form.elements & {
      email: HTMLInputElement;
      password: HTMLInputElement;
    };
    const { error } = await Server.post(`/auth/${path.url}`, {
      email: email.value.trim(),
      password: password.value.trim(),
    });
    if (error) return setShow(error);
    //navigation("/dashboard");
  }

  return (
    <div>
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="grid grid-rows-5 grid-flow-col gap-x-2 gap-y-2 bg-white p-2 rounded drop-shadow-md">
          <div className="row-span-5 w-80 hidden md:block">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/f/f5/CSU-Longbeach_seal.svg/1200px-CSU-Longbeach_seal.svg.png"
              alt="csulb-logo"
            />
          </div>
          <div className="col-span-2 bg-[#FFC72A] md:w-96 flex items-center justify-center space-x-4">
            <img
              className="w-6 h-6 block md:hidden"
              src="https://upload.wikimedia.org/wikipedia/en/thumb/f/f5/CSU-Longbeach_seal.svg/1200px-CSU-Longbeach_seal.svg.png"
              alt="csulb-logo"
            />
            <h3>CECS 443 - Project</h3>
          </div>
          <form className="col-span-2 row-span-4 space-y-2 flex justify-evenly flex-col" onSubmit={handleSubmit}>
            <div className="px-2">
              <label className="text-sm flex mb-1">E-mail</label>
              <input
                autoComplete="off"
                required
                id="email"
                type="email"
                placeholder="example@provider.com"
                className="w-full py-1.5 leading-loose px-2"
              />
            </div>
            <div className="px-2">
              <label className="text-sm flex mb-1">Password</label>
              <div className="inline-flex w-full">
                <input
                  type={visible ? "text" : "password"}
                  autoComplete="off"
                  required
                  id="password"
                  placeholder="your password"
                  className="w-full py-1.5 leading-loose px-2"
                />
                <button
                  className="flex items-center bg-[#000000] text-white px-2 rounded-tr rounded-br"
                  type="button"
                  onClick={() => setVisible(!visible)}>
                  {visible ? <AiFillEyeInvisible className="w-7 h-6" /> : <AiFillEye className="w-7 h-6" />}
                </button>
              </div>
            </div>
            <div className=" grid grid-cols-2 place-items-center">
              <Button title={path.name} type="submit" />
              <Button title="" type="button" onClick={handleButtonClick}>
                <AiOutlineSwap className="w-6 h-6" />
              </Button>
            </div>
          </form>
        </div>
        <Notification display={[show, setShow]} />
      </div>
    </div>

  );
}

export default App;
