function reducer(state, action) {
  switch (action.type) {
    case "add":
      return { list: [...state.list, action.payload] };
    case "list":
      return { list: [...state.list, ...action.payload] };
    default:
      throw new Error();
  }
}

export default reducer;
