import React from "react";
import { Button } from "../components";

export default function Profile() {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="grid grid-rows-4 w-96 bg-white p-2 rounded drop-shadow-md">
        <div className="bg-[#FFC72A] flex items-center justify-center">Complete your profile</div>
        <form className="row-span-3 flex flex-col space-y-2">
          <div className="px-2 mt-2">
            <label className="text-sm flex mb-1">Username</label>
            <div className="inline-flex w-full">
              <input
                type="text"
                autoComplete="off"
                required
                id="username"
                placeholder="username"
                className="w-full py-1.5 leading-loose px-2"
              />
            </div>
          </div>
          <div className="px-2">
            <label className="text-sm flex mb-1">Image</label>
            <div className="inline-flex w-full">
              <input
                type="text"
                autoComplete="off"
                required
                id="image"
                placeholder="image"
                className="w-full py-1.5 leading-loose px-2"
              />
            </div>
          </div>
          <div className="flex items-center justify-center pt-1">
            <Button title="Create" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
