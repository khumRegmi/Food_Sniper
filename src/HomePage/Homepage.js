import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import FeaturedRestaurants from "./FeaturedRestaurants";

import { SignInCtx } from "../App";

import OffersandBlogs from "./OffersandBlogs";
import Card from "../UI/Card";
import foodSniper from "./assets/foodSniper.png";
import logo from "./assets/Logo.png";

import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export default function Homepage() {
  const [foodName, setFoodName] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const history = useHistory();

  const suggestionHandler = (event) => {
    setFoodName(event.target.value);
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
    height: "32px",
  };

  const title = {
    marginLeft: "25%",
    padding: "5px",
    backgroundColor: "orange",
    width: "100vh",
    fontFamily: "cursive",
    textAlign: "center",
  };

  const foodSuggestions = ["Pizza", "Burger", "Biryani"];

  // const [featuredmages, setFeaturedImages] = useState([]);

  const [featuredArr, setFeaturedArr] = useState([
    {
      name: "Takeout",
      id: "5cc1f333df245c427cc2664b",
      banner: "https://i.imgur.com/AhXp45W.jpg",
    },
    {
      name: "Sultan's Dine",
      id: "5d96d1205e63182160a5dd85",
      banner: "https://i.imgur.com/6xgQ3Nx.jpg",
    },
    {
      name: "Kazi Foods",
      id: "5cc1fb51df245c427cc26652",
      banner: "https://i.imgur.com/Coiqzkr.jpg",
    },
  ]);

  // useEffect(() => {
  //   featuredArr.map((info) => {
  //     axios
  //       .get(`https://foodhub-api.herokuapp.com/restaurant/details/${info.id}`)
  //       .then((resp) =>
  //         setFeaturedImages((prevState) => [
  //           ...prevState,
  //           resp.data.data.banner_image,
  //         ])
  //       );
  //   });
  // }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "peachpuff",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: "20px",
          minWidth: "50%",
          backgroundImage: `url(${logo})`,
        }}
      >
        <img
          style={{ height: "300px", width: "300px", borderRadius: "50%" }}
          src={foodSniper}
          alt="theme logo"
        />
        <Card>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "16%",
              }}
            >
              <input
                style={{
                  height: "40px",
                  borderRadius: "15px 0px 0px 15px",
                  width: "400px",
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
                {foodSuggestions.map((item) => {
                  return (
                    <Button
                      style={btnStyles}
                      onClick={suggestionHandler}
                      value={item}
                    >
                      {item}
                    </Button>
                  );
                })}
              </div>
            )}
          </div>
        </Card>
      </div>
      <br />

      <div>
        <h1 style={title}>Featured Restaurants</h1>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {featuredArr.map((item) => (
            <div
              style={{
                border: "solid",
                justifyContent: "space-between",
              }}
            >
              <img
                style={{
                  height: "150px",
                  width: "230px",
                  padding: "10px",
                }}
                src={item.banner}
                alt={"restaurant banner pictures"}
                key={item}
                // onClick={history.push(`/restaurant/${item.id}`)}
              ></img>
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
      <OffersandBlogs />
    </div>
  );
}
