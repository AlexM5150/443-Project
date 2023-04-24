import React from "react";
import Navbar from "../components/NavBar";
import { AiOutlinePlusCircle } from "react-icons/ai";
export default function Dashboard() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8 border border-gray-400 rounded-md overflow-hidden sm:w-1/2 lg:w-3/4 h-5/6">
        <h1 className="text-2xl font-bold bg-gray-100 p-4 mb-4">Help</h1>
        <h1 className="text-2xl font-bold p-4 mb-4">Budgets</h1>
        <h1 className="text-2xl font-bold p-4 mb-4">Categories</h1>
        <h1 className="text-2xl font-bold p-4 mb-4">Expenses</h1>
          <div>
            <h2 className="p-4">To add an expense to a category, press the circle + icon <span><AiOutlinePlusCircle className="w-6 h-7 " /></span></h2>
            <h2 className="p-4">From here, you will be taken to a screen where the expense's title and cost can be manually</h2>
          </div>

          
      </div>
    </div>

  );
}
