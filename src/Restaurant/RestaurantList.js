// import React, { useState, useEffect } from "react";
import React, { useContext } from "react";

import axios from "axios";

let arr = [];

axios
  .get("https://foodhub-api.herokuapp.com/restaurant/search")
  .then((resp) => {
    arr = [...resp.data.data];
  });

export default function RestaurantList({ restHandler }) {
  return (
    <div
      style={{
        width: "90%",
        marginLeft: "5%",
        marginTop: "20px",
        padding: "30px",
        border: "solid grey 7px",
        borderRadius: "20px",
      }}
    >
      <h1
        style={{
          color: "red",
          display: "flex",
          justifyContent: "center",
          fontFamily: "serif",
        }}
      >
        This is a list of available restaurants:
      </h1>
      <ul>
        {arr.map((item) => (
          <ul
            style={{
              padding: "30px",
              display: "flex",
              flexDirection: "column",
            }}
            key={item._id}
          >
            Name: {item.name} Address: {item.address.area}
            <img
              style={{ width: "30px", height: "30px" }}
              src={`${item.banner_image}`}
              alt={`${item.name}`}
            />
          </ul>
        ))}
      </ul>
    </div>
  );
}
