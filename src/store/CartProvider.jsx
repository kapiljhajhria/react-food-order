import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  //
  const actionType = action.type;
  switch (actionType) {
    case "ADD_ITEM": {
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;

      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const exisitngCartItem = state.items[existingCartItemIndex];

      let updatedItems;

      if (exisitngCartItem) {
        const udpateItem = {
          ...exisitngCartItem,
          amount: exisitngCartItem.amount + action.item.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = udpateItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }
    case "REMOVE_ITEM": {
      const updatedItems = [...state.items];
      const existingCartItemIndex = updatedItems.findIndex(
        (item) => item.id === action.itemId
      );
      const existingItem = updatedItems[existingCartItemIndex];

      if (existingItem.amount === 1) {
        updatedItems.splice(existingCartItemIndex, 1);
      } else {
        updatedItems[existingCartItemIndex] = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
      }

      const updatedTotalAmount = state.totalAmount - existingItem.price;
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
