import React, { useState, useReducer } from "react";
import { Form, Button, Col, Alert } from "react-bootstrap";
import { addCards, luhnCheck } from "../util/api";
import reducer from "../reducer/CCRedcuer";
const CCform = props => {

  const { addList } = props;

  const initialFormState = {
    name: "",
    cardNumber: "",
    limit: 0
  };
  const [
    { formState, errorMessage, validated, validCardNumber },
    dispatch
  ] = useReducer(reducer, {
    validated: false,
    validCardNumber: false,
    errorMessage: "",
    formState: initialFormState
  });
  const handleSubmit = event => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity()) {
      addCards({ ...formState, balance: 0 })
        .then(response => {
          addList(response);
          dispatch({ type: "initial" });
        })
        .catch(({ response }) => {
          const { data } = response;
          dispatch({ type: "validate", payload: false });
          dispatch({ type: "message", payload: data.message });
        });
      return;
    }
    dispatch({ type: "validate", payload: true });
  };
  const handelChange = event => {
    const { name, value } = event.target;
    dispatch({ type: "resertForm", payload: { ...formState, [name]: value } });
  };
  const checkLuhn10 = event => {
    dispatch({ type: "validCard", payload: luhnCheck(formState.cardNumber) });
  };
  return (
    <div>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group as={Col} md="4" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            name="name"
            onChange={handelChange}
            type="type"
            value={formState.name}
            placeholder="Enter Name"
          />
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="formCardNumber">
          <Form.Label>Card Number</Form.Label>
          <Form.Control
            required
            name="cardNumber"
            type="text"
            pattern="\d{10,19}"
            maxLength="19"
            minLength="10"
            onChange={handelChange}
            onBlur={e => checkLuhn10()}
            value={formState.cardNumber}
            placeholder="Card Number"
          />
          <Form.Control.Feedback type="valid">
            Valid card number
          </Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Invalid card number
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="formLimit">
          <Form.Label>Card Limit</Form.Label>
          <Form.Control
            required
            name="limit"
            onChange={handelChange}
            type="number"
            value={formState.limit}
            placeholder="Card Limit"
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={!validCardNumber}>
          Add
        </Button>
      </Form>
    </div>
  );
};

export default CCform;
