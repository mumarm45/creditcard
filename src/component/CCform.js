import React, { useState } from "react";
import { Form, Button, Col, Alert } from "react-bootstrap";
import { addCards, luhnCheck } from "../util/api";
const CCform = props => {
  const { dispatch } = props;
  const initialState = {
    name: "",
    cardNumber:"",
    limit :""
  };
  const [validated, setValidated] = useState(false);
  const [validCardNumber, setValidCardNumber] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formState, setFormState] = useState(initialState);
  const handleSubmit = event => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity()) {
      addCards({ ...formState, balance: 0 })
        .then(response => {
          dispatch({
            type: "add",
            payload: response
          });
          setFormState(initialState);
          setValidated(false);
          setErrorMessage("");
        })
        .catch(({ response }) => {
          const { data } = response;
          setErrorMessage(data.message);
          setValidCardNumber(true);
        });
      return;
    }
    setValidated(true);
  };
  const handelChange = event => {
    const {name,value} = event.target;
    setFormState(prState =>( {
      ...prState,
       [name]: value
    }))
  };
  const checkLuhn10 = event => {
    setValidCardNumber(luhnCheck(formState.cardNumber));
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
