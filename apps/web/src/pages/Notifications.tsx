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
    }, []);

    if (UserBudget.length === 0) {
        return(
            <div>
                <Navbar />
                <h3>Please add a budget</h3>
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