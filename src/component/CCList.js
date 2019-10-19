import React, { useContext } from "react";
import { Table } from "react-bootstrap";
import ListContext from "../Context/ListContext";
function CCList() {
  const { state } = useContext(ListContext);
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
        {state.list.map(ls => {
          return (
            <tr key={ls.id}>
              <td>{ls.name}</td>
              <td>{ls.cardNumber}</td>
              <td>${ls.balance}</td>
              <td>${ls.limit}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default CCList;
