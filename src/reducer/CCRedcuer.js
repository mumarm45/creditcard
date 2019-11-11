function reducer(state, action) {
  switch (action.type) {
    case "add":
      return { list: [...state.list, action.payload] };
    case "list":
      return { list: [...state.list, ...action.payload] };
    case "resertForm":
      return { ...state, formState: action.payload };
    case "validate":
      return { ...state, validate: action.payload };
    case "message":
      return { ...state, message: action.payload };
    case "validCard":
      console.log(action.payload);
      return { ...state, validCardNumber: action.payload };
    case "initial":
      return {
        ...state,
        message: "",
        validate: false,
        formState: { name: "", cardNumber: "", limit: 0 }
      };
    default:
      throw new Error();
  }
}

export default reducer;
