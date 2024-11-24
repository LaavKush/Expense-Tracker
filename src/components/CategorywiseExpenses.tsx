import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { Accordion, ListGroup } from "react-bootstrap";
import { format } from "date-fns";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Expense {
  id: string;
  title: string;
  amount: number;
  dateAdded: string;
  category: string;
}

const CategorywiseExpenses: React.FC = () => {
  const expenses = useSelector((state: RootState) => state.expenses.list);
  const [groupedExpenses, setGroupedExpenses] = useState<{
    [key: string]: { [key: string]: Expense[] };
  }>({});

  useEffect(() => {
    const grouped = expenses.reduce((acc, expense) => {
      const month = expense.dateAdded.split("T")[0].slice(0, 7); // Get YYYY-MM
      const category = expense.category;
      acc[month] = acc[month] || {};
      acc[month][category] = acc[month][category] || [];
      acc[month][category].push(expense);
      return acc;
    }, {} as { [key: string]: { [key: string]: Expense[] } });

    setGroupedExpenses(grouped);
  }, [expenses]);

  const generateChartData = (expenses: { [key: string]: Expense[] }) => {
    const labels = Object.keys(expenses);
    const data = labels.map(category =>
      expenses[category].reduce((acc, expense) => acc + expense.amount, 0)
    );

    return {
      labels,
      datasets: [
        {
          label: "Category-wise Spending",
          data,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1
        }
      ]
    };
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Category Wise Expenses</h2>
      <Accordion defaultActiveKey="0" flush>
        {Object.keys(groupedExpenses)
          .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
          .map((month: string, index) => (
            <Accordion.Item eventKey={index.toString()} key={month}>
              <Accordion.Header>
                <div className="w-100 d-flex justify-content-between">
                  <div>{format(new Date(month + "-01"), "MMMM yyyy")}</div>
                </div>
              </Accordion.Header>
              <Accordion.Body>
              <div className="mb-4">
                  <Bar data={generateChartData(groupedExpenses[month])} />
                </div>
                {Object.keys(groupedExpenses[month]).map((category) => {
                  const totalAmount = groupedExpenses[month][category].reduce(
                    (acc, expense) => acc + expense.amount,
                    0
                  );
                  return (
                    <div key={category} className="mb-3">
                      <div className="d-flex justify-content-between">
                        <h5 className="fw-bold">{category}</h5>
                        <h5 className="fw-bold">${totalAmount.toFixed(2)}</h5>
                      </div>
                      <ListGroup variant="flush">
                        {groupedExpenses[month][category].map((expense) => (
                          <ListGroup.Item key={expense.id}>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="title-width">{expense.title}</div>
                              <div>${expense.amount.toFixed(2)}</div>
                            </div>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </div>
                  );
                })}
              </Accordion.Body>
            </Accordion.Item>
          ))}
      </Accordion>
    </div>
  );
};

export default CategorywiseExpenses;
