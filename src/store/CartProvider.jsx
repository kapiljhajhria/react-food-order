import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  //
  const actionType = action.type;
  switch (action) {
    case "ADD_ITEM": {
      const updatedItems = state.items.concat(action.item);
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }
    case "REMOVE_ITEM": {
      const index = state.items.findIndex((item) => item.id === action.itemId);
      const updatedItems = [...state.items];
      const itemRemoved = updatedItems.splice(index, 1);
      const updatedTotalAmount =
        state.totalAmount - itemRemoved.price * itemRemoved.amount;
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }

    default: {
      return state;
    }
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartACtion] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    dispatchCartACtion({ type: "ADD_ITEM", item: item });
  };
  const removeItemFromCartHandler = (itemId) => {
    dispatchCartACtion({ type: "REMOVE_ITEM", itemId: itemId });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
