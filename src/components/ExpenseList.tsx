import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  Pagination,
  ButtonGroup,
  Button,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { RootState } from "@redux/store";
import { deleteExpense } from "@redux/expensesSlice";
import { format } from "date-fns";
import { CSVLink } from "react-csv";

interface Expense {
  id: string;
  title: string;
  amount: number;
  dateAdded: string;
  category: string;
}

interface ExpenseItemProps {
  expense: Expense;
  onDelete: (id: string) => void;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense, onDelete }) => {
  return (
    <tr>
      <td>{expense.title}</td>
      <td>${expense.amount.toFixed(2)}</td>
      <td>{expense.category}</td>
      <td>{format(new Date(expense.dateAdded), "dd/MM/yyyy")}</td>
      <td>
        <Button variant="danger" onClick={() => onDelete(expense.id)}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

const ExpenseList: React.FC = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state: RootState) => state.expenses.list);
  const categories = useSelector((state: RootState) => state.categories.list);

  const [filterTitle, setFilterTitle] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [sortBy, setSortBy] = useState<keyof Expense>("dateAdded"); // Use keyof Expense for type safety
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [expensesPerPage] = useState(10);

  const headers = [
    { label: "Title", key: "title" },
    { label: "Amount", key: "amount" },
    { label: "Category", key: "category" },
    { label: "Date Added", key: "dateAdded" },
  ];
  const csvData = expenses.map((expense) => ({
    ...expense,
    dateAdded: format(new Date(expense.dateAdded), "dd/MM/yyyy"),
  }));

  const handleDelete = (id: string) => {
    dispatch(deleteExpense(id));
  };

  // Filtering and Sorting Logic
  const filteredExpenses = expenses
    .filter((expense) =>
      expense.title.toLowerCase().includes(filterTitle.toLowerCase())
    )
    .filter((expense) => expense.category.includes(filterCategory))
    .filter((expense) => {
      const date = new Date(expense.dateAdded);
      return (
        (!filterStartDate || date >= new Date(filterStartDate)) &&
        (!filterEndDate || date <= new Date(filterEndDate))
      );
    })
    .sort((a, b) => {
      if (sortBy === "dateAdded") {
        return sortOrder === "asc"
          ? new Date(a[sortBy]).getTime() - new Date(b[sortBy]).getTime()
          : new Date(b[sortBy]).getTime() - new Date(a[sortBy]).getTime();
      } else if (sortBy === "amount") {
        return sortOrder === "asc"
          ? a[sortBy] - b[sortBy]
          : b[sortBy] - a[sortBy];
      } else {
        return 0;
      }
    });

  // Pagination Logic
  const indexOfLastExpense = currentPage * expensesPerPage;
  const indexOfFirstExpense = indexOfLastExpense - expensesPerPage;
  const currentExpenses = filteredExpenses.slice(
    indexOfFirstExpense,
    indexOfLastExpense
  );

  // Page Change Handler
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="mt-5">
      <div>
        {/* Filter by Title */}
        <Form.Group as={Row} className="mb-2">
          <Form.Label column xs="12" sm="3">
            Title:
          </Form.Label>
          <Col xs="12" sm="9">
            {" "}
            {/* Use xs for full width on extra-small screens */}
            <Form.Control
              type="text"
              placeholder="Filter by Title"
              value={filterTitle}
              onChange={(e) => setFilterTitle(e.target.value)}
            />
          </Col>
        </Form.Group>

        {/* Filter by Category */}
        <Form.Group as={Row} className="mb-2">
          <Form.Label column xs="12" sm="3">
            Category:
          </Form.Label>
          <Col xs="12" sm="9">
            <Form.Select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>

        {/* Filter by Date Range */}
        <Form.Group as={Row} className="mb-2">
          <Form.Label column xs="12" sm="3">
            Date Range:
          </Form.Label>
          <Col xs="12" md="4" lg="4">
            {" "}
            {/* Adjust column widths for responsiveness */}
            <Form.Control
              type="date"
              placeholder="Start Date"
              value={filterStartDate}
              onChange={(e) => setFilterStartDate(e.target.value)}
            />
          </Col>
          <Col xs="12" md="5" lg="5">
            <Form.Control
              type="date"
              placeholder="End Date"
              value={filterEndDate}
              onChange={(e) => setFilterEndDate(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-2">
          <Col xs={{ span: 12, offset: 3 }} sm={{ span: 9, offset: 3 }}>
            <Button
              variant="secondary"
              onClick={() => {
                setFilterTitle("");
                setFilterCategory("");
                setFilterStartDate("");
                setFilterEndDate("");
              }}
            >
              Clear Filters
            </Button>
          </Col>
        </Form.Group>
      </div>

      <div className="d-flex align-items-center mb-2">
        {" "}
        <h2 className="flex-grow-1">Expense List</h2>{" "}
        <CSVLink
          data={csvData}
          headers={headers}
          filename={"expenses.csv"}
          className="btn btn-success"
        >
          Download
        </CSVLink>
      </div>

      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>Title</th>
            <th>
              Amount
              <ButtonGroup size="sm" className="ms-2">
                <Button
                  variant={
                    sortBy === "amount" && sortOrder === "asc"
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() => {
                    setSortBy("amount");
                    setSortOrder("asc");
                  }}
                >
                  &#x25B2;
                </Button>
                <Button
                  variant={
                    sortBy === "amount" && sortOrder === "desc"
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() => {
                    setSortBy("amount");
                    setSortOrder("desc");
                  }}
                >
                  &#x25BC;
                </Button>
              </ButtonGroup>
            </th>
            <th>Category</th>
            <th>
              Date of Purchase
              <ButtonGroup size="sm" className="ms-2">
                <Button
                  variant={
                    sortBy === "dateAdded" && sortOrder === "asc"
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() => {
                    setSortBy("dateAdded");
                    setSortOrder("asc");
                  }}
                >
                  &#x25B2;
                </Button>
                <Button
                  variant={
                    sortBy === "dateAdded" && sortOrder === "desc"
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() => {
                    setSortBy("dateAdded");
                    setSortOrder("desc");
                  }}
                >
                  &#x25BC;
                </Button>
              </ButtonGroup>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentExpenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </Table>

      <Pagination className="justify-content-center">
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        <Pagination.Item active={currentPage === 1}>
          {currentPage}
        </Pagination.Item>
        {/* You might want to add more page items here */}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={indexOfLastExpense >= filteredExpenses.length}
        />
      </Pagination>
    </div>
  );
};

export default ExpenseList;
