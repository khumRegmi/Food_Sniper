import React, { useState, useContext } from "react";

import { SignInCtx } from "../App";

export default function Cart() {
  const { cart } = useContext(SignInCtx);

  let totalAmount = 0;

  const [checkOut, setCheckOut] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const addressHandler = (e) => {
    setAddress(e.target.value);
  };

  const submitHandler = () => setCheckOut(true);

  const handleOrderSubmit = () => {
    alert(`${name}, your order is successful. Thank you!`);
  };

  cart.map((item) => (totalAmount += item));

  return (
    <div>
      <h1
        style={{
          backgroundColor: "deeppink",
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        WELCOME, to your cart!{" "}
      </h1>
      <ol>
        {cart.map((item) => (
          <li
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "10px",
            }}
          >
            <h3 style={{ fontFamily: "cursive", marginLeft: "150px" }}>
              {item.itemName}
            </h3>
            <h5 style={{ marginRight: "150px" }}>${item.price}</h5>
          </li>
        ))}
      </ol>

      <div
        style={{
          display: "flex",
          justifyContent: "right",
          flexDirection: "column",
          marginRight: "55px",
          color: "darkviolet",
        }}
      >
        <h3> Your total amount due is ${totalAmount} </h3>
        <button
          style={{ width: "100px", height: "30px", marginLeft: "250px" }}
          onClick={submitHandler}
        >
          Place order
        </button>
      </div>

      {checkOut && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginLeft: "30%",
            marginTop: "30px",
            border: "solid black",
            width: "40%",
            padding: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <p>Please enter your name: </p>
            <input
              onChange={nameHandler}
              value={name}
              style={{ height: "30px" }}
            ></input>
          </div>
          <br />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <p>Please enter your address: </p>
            <input
              onChange={addressHandler}
              value={address}
              style={{ height: "30px" }}
            ></input>
          </div>

          <button
            style={{
              width: "90px",
              height: "30px",
              color: "red",
              marginLeft: "77%",
              marginTop: "10px",
            }}
            onClick={handleOrderSubmit}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
