import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  Button,
  Container,
  FormLabel,
  FormControl,
  FormGroup,
  Toast,
} from "react-bootstrap"; // Added FormLabel, FormControl, FormGroup
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "@redux/store";
import { addExpense } from "@redux/expensesSlice";


interface FormData {
  title: string;
  amount: string;
  category: string;
}

const AddExpenseForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories.list);
  const [showToast, setShowToast] = useState(false);

  const onSubmit = (data: FormData) => {
    const newExpense = {
      id: uuidv4(),
      title: data.title,
      amount: parseFloat(data.amount),
      dateAdded: new Date().toISOString(),
      category: data.category,
    };
    dispatch(addExpense(newExpense));
    setShowToast(true);
    reset();
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Form onSubmit={handleSubmit(onSubmit)} className="p-4 mb-4 w-25">
        {/* Title Input */}
        <FormGroup className="mb-3" controlId="formTitle">
          <FormLabel>Title</FormLabel>
          <FormControl
            type="text"
            placeholder="Title"
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 3,
                message: "Title must be at least 3 characters",
              },
              maxLength: {
                value: 20,
                message: "Title cannot exceed 20 characters",
              },
            })}
            isInvalid={!!errors.title} // Add isInvalid prop
          />
          <FormControl.Feedback type="invalid">
            {errors.title?.message}
          </FormControl.Feedback>
        </FormGroup>
        {/* Amount Input */}
        <FormGroup className="mb-3" controlId="formAmount">
          <FormLabel>Amount</FormLabel>
          <FormControl
            type="number"
            placeholder="Amount"
            {...register("amount", {
              required: "Amount is required",
              min: { value: 0, message: "Amount must be a positive number" },
              max: { value: 99999, message: "Amount cannot exceed 99999" },
            })}
            isInvalid={!!errors.amount}
          />
          <FormControl.Feedback type="invalid">
            {errors.amount?.message}
          </FormControl.Feedback>
        </FormGroup>
        {/* Category Select */}
        <FormGroup className="mb-3" controlId="formCategory">
          <FormLabel>Category</FormLabel>
          <Form.Select
            {...register("category", { required: "Category is required" })}
            isInvalid={!!errors.category}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </Form.Select>
          <FormControl.Feedback type="invalid">
            {errors.category?.message}
          </FormControl.Feedback>
        </FormGroup>

        <Button variant="primary" type="submit" className="w-100">
          Add Expense
        </Button>
      </Form>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        autohide
        delay={3000}
        style={{
          position: "fixed",
          top: "1rem",
          right: "1rem",
          zIndex: 1000,
        }}
      >
        <Toast.Header closeButton={false}>
          <strong className="me-auto">Expense Tracker</strong>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowToast(false)}
          ></button>
        </Toast.Header>
        <Toast.Body>Expense added successfully!</Toast.Body>
      </Toast>
    </Container>
  );
};

export default AddExpenseForm;
