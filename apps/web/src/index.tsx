import React from "react";
import "./index.css";
import App from "./App";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages";
import Expenses from "./pages/Expenses";
import UserBudget from "./pages/UserBudget";
import Notifications from "./pages/Notifications";
import EditExpense from "./pages/editExpense";
import Categories from "./pages/Categories";
import EditCategory from "./pages/editCategory";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path ="/expense" element={<Expenses />} />
        <Route path ="/categories" element={<Categories />} />
        <Route path="/editCategory" element={<EditCategory />} />
        <Route path="/notifications" element={<Notifications />} />

        <Route path="/budgets" element={<UserBudget />} />
        <Route path="/editExpense" element={<EditExpense />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
