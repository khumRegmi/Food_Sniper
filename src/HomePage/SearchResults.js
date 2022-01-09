import React, { useState, useEffect } from "react";

import axios from "axios";

import { Link, useParams, useHistory } from "react-router-dom";
import { SocialIcon } from "react-social-icons";

export default function RestaurantList() {
  const foodName = useParams().foodName.toLowerCase();

  const [sortVal, setSortVal] = useState("popularity");

  const sortVals = [
    {
      sort: "popularity",
      name: "Popularity",
    },
    {
      sort: "rating",
      name: "Ratings",
    },
    {
      sort: "recent",
      name: "Recently Added",
    },
  ];

  const [isLoading, setIsLoading] = useState(true);

  const [filter, setFilter] = useState(false);
  const [sortedOrder, setSortedOrder] = useState("Popularity");
  const [arr, setArr] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios
      .get(
        `https://foodhub-api.herokuapp.com/restaurant/search?food=${foodName}&sort=${sortVal}`
      )
      .then((resp) => {
        setArr([...resp.data.data]);
        setIsLoading(false);
      });
  }, [filter]);

  const sortValHandler = (event) => {
    setSortVal(event.target.value);
  };

  const filterHandler = () => {
    setFilter(!filter);
    setSortedOrder(sortVal);
  };

  return (
    <div>
      {isLoading && (
        <h1
          style={{
            fontSize: "25px",
            display: "block",
            margin: "250px 50% 25px",
            color: "blue",
          }}
        >
          Loading...
        </h1>
      )}

      {!isLoading && (
        <div
          style={{
            width: "90%",
            marginLeft: "5%",
            marginTop: "20px",
            padding: "30px",
            border: "solid grey 7px",
            borderRadius: "20px",
            backgroundColor: "skyblue",
          }}
        >
          <div>
            <h2
              style={{
                color: "red",
                display: "flex",
                justifyContent: "center",
                fontFamily: "serif",
                backgroundColor: "pink",
              }}
            >
              Based on your search, this is a list of available
              <br />
              restaurants that serve '{foodName}'
            </h2>
            {!arr.length && (
              <h1 style={{ fontSize: "25px", fontFamily: "monospace" }}>
                No results. Apologies!{" "}
              </h1>
            )}
            <Link to="/">
              <button
                style={{
                  textDecoration: "none",
                  borderRadius: "25px",
                  backgroundColor: "lightyellow",
                  marginBottom: "20px",
                }}
              >
                Back to home page
              </button>
            </Link>
          </div>

          {!!arr.length && (
            <div
              style={{
                border: "solid lightblue",
                backgroundColor: "rosybrown",
                height: "auto",
                width: "25%",
                padding: "10px",
              }}
            >
              <h5 style={{ marginTop: "30px", fontFamily: "monospace" }}>
                Sort by:
              </h5>
              <ul
                style={{
                  listStyleType: "none",
                  marginTop: "20px",
                }}
              >
                {sortVals.map((item) => {
                  return (
                    <li style={{ display: "flex", flexDirection: "row" }}>
                      <input
                        type="radio"
                        value={item.sort}
                        name="sortVal"
                        onClick={sortValHandler}
                      ></input>
                      <p
                        style={{
                          marginTop: "-7px",
                          marginLeft: "5px",
                          fontFamily: "fantasy",
                        }}
                      >
                        {item.name}
                      </p>
                    </li>
                  );
                })}
              </ul>
              <button
                style={{
                  marginTop: "-200px",
                  backgroundColor: "orange",
                  marginLeft: "70%",
                }}
                onClick={filterHandler}
              >
                Filter
              </button>
            </div>
          )}

          {!!arr.length && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                border: "dotted black 3px",
                width: "65%",
                marginTop: "-200px",
                marginLeft: "28%",
                backgroundColor: "sienna",
              }}
            >
              <p
                style={{
                  marginLeft: "58%",
                  width: "170px",
                  backgroundColor: "yellow",
                  textAlign: "center",
                }}
              >
                [In order of {sortedOrder}]
              </p>
              <ul>
                {arr.map((item) => (
                  <li
                    style={{
                      padding: "30px",
                      display: "flex",
                      flexDirection: "row",
                      alignContent: "space-evenly",
                      alignItems: "normal",
                      border: "solid black",
                      margin: "auto 15% 24px",
                      width: "400px",
                      height: "150px",
                      backgroundColor: "lightyellow",
                      cursor: "pointer",
                    }}
                    key={item._id}
                    onClick={() => {
                      let key = `${item._id}`;
                      history.push(`/restaurant/${key}`);
                    }}
                  >
                    <div>
                      <img
                        style={{
                          width: "100px",
                          height: "100px",
                          padding: "10px",
                        }}
                        src={`${item.banner_image}`}
                        alt={`${item.name}`}
                      />
                    </div>
                    <div>
                      <h4 style={{ marginBottom: "-20px" }}>{item.name} </h4>
                      <br />
                      {item.address.area}, {item.address.district}
                    </div>
                    <div style={{ marginLeft: "100px" }}>
                      <div
                        style={{
                          border: "solid",
                          padding: "0px 3px 0px ",
                          backgroundColor: "saddlebrown",
                          height: "32px",
                          width: "32px",
                          color: "white",
                        }}
                      >
                        {item.review.average.toFixed(1)}
                      </div>
                      <br />
                      <div style={{ marginTop: "-25px", fontSize: "8px" }}>
                        {item.review.count} reviews
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          marginLeft: "-70px",
                          marginTop: "10px",
                        }}
                      >
                        <SocialIcon url="https://facebook.com/" />
                        <SocialIcon url="https://gmail.com/" />
                        <SocialIcon url="https://twitter.com" />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
