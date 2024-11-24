import React, { useState, useEffect } from "react";
import { Container, Nav, Tab } from "react-bootstrap"; // Importing Nav and Tab components
import ExpenseList from "@components/ExpenseList";
import AddExpenseForm from "@components/AddExpenseForm";
import DailyExpenses from "@components/DailyExpenses";
import MonthlyExpenses from "@components/MonthlyExpenses";
import CategorywiseExpenses from "@components/CategorywiseExpenses";
import FloatingIcon from "./FloatingIcon";
import {
  initialCategories,
  getRandomAmount,
  getRandomDate,
  getRandomTitle,
} from "@lib/loadDummyData";

const App: React.FC = () => {
  useEffect(() => {
    const data = [];
    for (let i = 0; i < 1000; i++) {
      const categoryIndex = Math.floor(
        Math.random() * initialCategories.length
      );
      data.push({
        id: `id${i}`,
        title: getRandomTitle(categoryIndex),
        amount: getRandomAmount(),
        dateAdded: getRandomDate(),
        category: initialCategories[categoryIndex].name,
      });
    }

    localStorage.setItem("expenses", JSON.stringify(data));
  }, []); // Load some dummy data on initial load
  const [key, setKey] = useState("add-expense"); // Initial active tab

  return (
    <Container className="p-4">
      <nav className="navbar navbar-light bg-light mb-5">
        <div className="container-fluid d-flex justify-content-center">
          <span className="navbar-brand mb-0 h1 text-center fs-1">
            Expense Tracker
          </span>
        </div>
      </nav>

      <Tab.Container activeKey={key} onSelect={(k) => setKey(k as string)}>
        <Nav variant="pills" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey="add-expense">Add Expense</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="transactions">Transactions</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="daily-expenses">Daily Expenses</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="monthly-expenses">Monthly Expenses</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="categorywise-expenses">
              Category Wise Expenses
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="add-expense">
            <AddExpenseForm />
          </Tab.Pane>
          <Tab.Pane eventKey="transactions">
            <ExpenseList />
          </Tab.Pane>
          <Tab.Pane eventKey="daily-expenses">
            <DailyExpenses />
          </Tab.Pane>
          <Tab.Pane eventKey="monthly-expenses">
            <MonthlyExpenses />
          </Tab.Pane>
          <Tab.Pane eventKey="categorywise-expenses">
            <CategorywiseExpenses />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
      <FloatingIcon />
    </Container>
  );
};

export default App;
