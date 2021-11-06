import React, { useState, useEffect } from "react";

import { Link, useParams, useHistory } from "react-router-dom";

import axios from "axios";

export default function RestaurantList() {
  const foodName = useParams().foodName.toLowerCase();
  const [isLoading, setIsLoading] = useState(true);
  const [arr, setArr] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios
      .get(
        `https://foodhub-api.herokuapp.com/restaurant/search?food=${foodName}`
      )
      .then((resp) => {
        setArr([...resp.data.data]);
        setIsLoading(false);
      });
  }, []);

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
          <h1
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
          </h1>
          {!arr.length && <h1>No results. Apologies! </h1>}
          <Link to="/">
            <button
              style={{
                textDecoration: "none",
                borderRadius: "25px",
                backgroundColor: "lightyellow",
              }}
            >
              Back to home page
            </button>
          </Link>
          <ul>
            {arr.map((item) => (
              <li
                style={{
                  padding: "30px",
                  display: "flex",
                  flexDirection: "column",
                  border: "solid black",
                  borderRadius: "10%",
                  margin: "auto 40% 24px",
                  width: "auto",
                  backgroundColor: "lightyellow",
                  cursor: "pointer",
                }}
                key={item._id}
                onClick={() => {
                  let key = `${item._id}`;
                  history.push(`/restaurant/${key}`);
                }}
              >
                <img
                  style={{ width: "100px", height: "100px" }}
                  src={`${item.banner_image}`}
                  alt={`${item.name}`}
                />
                <h4 style={{ marginBottom: "-20px" }}>{item.name} </h4>
                <br />
                {item.address.area}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
