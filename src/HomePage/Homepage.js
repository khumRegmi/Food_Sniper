import React, { useContext, useState } from "react";

import { SignInCtx } from "../App";

import Card from "../UI/Card";
import foodSniper from "./assets/foodSniper.png";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export default function Homepage() {
  // const { nameUser } = useContext(SignInCtx);

  const [foodName, setFoodName] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const history = useHistory();

  const callthis1 = () => {
    setFoodName("Pizza");
  };
  const callthis2 = () => {
    setFoodName("Burger");
  };
  const callthis3 = () => {
    setFoodName("Biryani");
  };

  function onSearchClick() {
    setShowSuggestions(true);
  }

  const foodNameHandler = (e) => {
    setFoodName(e.target.value);
  };

  const handleSubmit = () => {
    if (!foodName) {
      alert("Cannot be empty");
      return;
    }
    history.push(`/searchResults/${foodName}`);
  };

  const btnStyles = {
    backgroundColor: "pink",
    color: "black",
    textAlign: "left",
    fontFamily: "cursive",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: "20px",
      }}
    >
      <img src={foodSniper} alt="theme logo" />
      <Card>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "200px",
            }}
          >
            <input
              style={{
                height: "40px",
                borderRadius: "15px 0px 0px 15px",
                width: "400px",
                marginRight: "20px",
              }}
              value={foodName}
              placeholder="Search by Food"
              onClick={onSearchClick}
              onChange={foodNameHandler}
            ></input>
            <input
              style={{
                borderRadius: "0px 15px 15px 0px",
                width: "250px",
                marginRoght: "15px",
              }}
              placeholder="Location"
            ></input>

            <button onClick={handleSubmit} style={{ borderRadius: "50%" }}>
              <FaSearch />
            </button>
          </div>
          {showSuggestions && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "400px",
              }}
            >
              <Button style={btnStyles} onClick={callthis1}>
                Pizza
              </Button>
              <Button style={btnStyles} onClick={callthis2}>
                Burger
              </Button>
              <Button style={btnStyles} onClick={callthis3}>
                Biryani
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
