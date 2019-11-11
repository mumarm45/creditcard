import React from "react";
import { Table } from "react-bootstrap";
function CCList(props) {
  const { list } = props;
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Card Number</th>
          <th>Balance</th>
          <th>Limit</th>
        </tr>
      </thead>
      <tbody>
        {list.map(ls => {
          const { id, name, cardNumber, balance, limit } = ls;
          return (
            <tr key={id}>
              <td>{name}</td>
              <td>{cardNumber}</td>
              <td>${balance}</td>
              <td>${limit}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default CCList;
