import React from "react";
import "./index.css";
import App from "./App";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard, Categories, EditCategory, EditExpense, Expenses, Notifications, BudgetPage } from "./pages";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Notifications />} />
        <Route path="/budgets" element={<BudgetPage />} />
        <Route path="/help" element={<Dashboard />} />
        <Route path="/expense" element={<Expenses />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/editCategory" element={<EditCategory />} />
        <Route path="/editExpense" element={<EditExpense />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
