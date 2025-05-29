const initialState = {
  items: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CART":
      return { items: action.payload };
    case "CLEAR_CART":
      return { items: [] };
    default:
      return state;
  }
};

export default cartReducer;
