import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import { IError, IBudget } from "../types";
import Server from "../tools/Server";
import { Notification } from "../components";

import Display from "../components/Display";
// sample budget

// Created by Dylan Huynh and Deric Cheng
export default function Notifications() {
    // const [show, setShow] = useState<IError>({ message: "", active: false });
    const [UserBudget, setUserBudget] = useState<IBudget[]>([]);
    

    useEffect(() => {
        const getBudget = async () => {
            const { response } = await Server.get<IBudget[]>("/user/budget");
            setUserBudget(response as IBudget[])
        }
        getBudget();
    }, []);

    if (UserBudget.length === 0) {
        return(
            <div>Please add a budget</div>
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