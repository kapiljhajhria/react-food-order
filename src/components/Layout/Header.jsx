import React from "react";
import classes from "./Header.module.css";
import mealsImg from "../../assets/meals.jpg";

const Header = () => {
  return (
    <>
      <header className={classes.header}>
        <h1>Meals</h1>
        <button>Cart</button>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImg} alt="a table full of delicious food" />
      </div>
    </>
  );
};

export default Header;
