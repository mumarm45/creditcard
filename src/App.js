import React, { useReducer, useEffect } from "react";
import "./App.css";
import reducer from "./reducer/CCRedcuer";
import ListContext from "./Context/ListContext";
import CCList from "./component/CCList";
import CCform from "./component/CCform";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchCards } from "./util/api";
function App() {
  const [state, dispatch] = useReducer(reducer, {
    list: []
  });

  async function fetchData() {
    const { cards } = await fetchCards();
    dispatch({ type: "list", payload: cards }, []);
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <ListContext.Provider value={{ state, dispatch }}>
      <h3>Credit Card System</h3>
      <CCform dispatch={dispatch} />
      <h3>Existing Cards</h3>
      <CCList />
    </ListContext.Provider>
  );
}

export default App;
