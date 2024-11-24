import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { Accordion, ListGroup } from "react-bootstrap";
import { format } from "date-fns";

interface Expense {
  id: string;
  title: string;
  amount: number;
  dateAdded: string;
  category: string;
}

const MonthlyExpenses: React.FC = () => {
  const expenses = useSelector((state: RootState) => state.expenses.list);
  const [groupedExpenses, setGroupedExpenses] = useState<{
    [key: string]: Expense[];
  }>({});

  useEffect(() => {
    const grouped = expenses.reduce((acc, expense) => {
      const month = expense.dateAdded.split("T")[0].slice(0, 7); // Get YYYY-MM
      acc[month] = acc[month] || [];
      acc[month].push(expense);
      return acc;
    }, {} as { [key: string]: Expense[] });

    setGroupedExpenses(grouped);
  }, [expenses]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Monthly Expenses</h2>
      <Accordion defaultActiveKey="0" flush>
        {Object.keys(groupedExpenses)
          .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
          .map((month: string, index) => {
            const totalAmount = groupedExpenses[month].reduce(
              (acc, expense) => acc + expense.amount,
              0
            );
            return (
              <Accordion.Item eventKey={index.toString()} key={month}>
                <Accordion.Header>
                  <div className="w-100 d-flex justify-content-between">
                    <div>{format(new Date(month + "-01"), "MMMM yyyy")}</div>
                    <div className="fw-bold">
                      Total: ${totalAmount.toFixed(2)}
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <ListGroup variant="flush">
                    {groupedExpenses[month].map((expense) => (
                      <ListGroup.Item key={expense.id}>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="title-width">{expense.title}</div>
                          <div className="title-width">
                            {format(
                              new Date(expense.dateAdded),
                              "EEEE, MMMM d, yyyy"
                            )}
                          </div>
                          <div className="text-muted category-width">
                            ({expense.category})
                          </div>
                          <div>${expense.amount.toFixed(2)}</div>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
      </Accordion>
    </div>
  );
};

export default MonthlyExpenses;
