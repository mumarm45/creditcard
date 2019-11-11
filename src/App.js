import React, { useState, useEffect } from "react";
import "./App.css";
import CCList from "./component/CCList";
import CCform from "./component/CCform";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchCards } from "./util/api";
function App() {
  const [list, updateList] = useState(() => {
    return [];
  });

  async function fetchData() {
    const { cards } = await fetchCards();
    updateList(cards);
  }

  const addList = newList => {
    updateList([...list, newList]);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <h3>Credit Card System</h3>
      <CCform addList={addList} />
      <h3>Existing Cards</h3>
      <CCList list={list} />
    </div>
  );
}

export default App;
