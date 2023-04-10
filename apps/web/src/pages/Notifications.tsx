import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import { IError, IBudget } from "../types";
import Server from "../tools/Server";
import { Notification } from "../components";

import Display from "../components/Display";

// Created by Dylan Huynh
/**
 * 
 * @returns a react component that displays the most recent budget as a progress bar
 */
export default function Notifications() {
    const [UserBudget, setUserBudget] = useState<IBudget[]>([]);
    

    useEffect(() => {
        const getBudget = async () => {
            // gets the budget and set it to a state
            const { response } = await Server.get<IBudget[]>("/user/budget");
            setUserBudget(response as IBudget[])
        }
        getBudget();


        const checkDeadline = (budget: IBudget) => {
            const date = new Date()
            const day = date.getDay()
            const month = date.getMonth() + 1
            const year = date.getFullYear()

            const budgetCreated = budget._current // this will be changed to created or something
            // check when date was created and compare <= with getTime();
        }
    }, []);

    if (UserBudget.length === 0) {
        return(
            <div>
                <Navbar />
                <div className="container mx-auto mt-8 border border-gray-400 rounded-md overflow-hidden sm:w-1/2 lg:w-3/4 h-5/6">
                    <h1 className="text-2xl font-bold bg-gray-100 p-4 mb-4">Please add a budget</h1>
                </div>
                
            </div>
        )
    }
    return(
        <div>
            <Navbar />
            <Display
                budgets = {UserBudget}
                currentBudget={UserBudget[UserBudget.length - 1]}
                
            />
        </div>

    )
}