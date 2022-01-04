import axios from "axios";
import React, { useState, useEffect } from "react";

export default function FeaturedRestaurants() {
  const [images, setImages] = useState([]);

  const [featuredArr, setFeaturedArr] = useState([
    {
      name: "Takeout",
      id: "5cc1f333df245c427cc2664b",
    },
    {
      name: "Sultan's Dine",
      id: "5d96d1205e63182160a5dd85",
    },
    {
      name: "Kazi Foods",
      id: "5cc1fb51df245c427cc26652",
    },
  ]);

  useEffect(() => {
    // const featuredArr = [
    //   {
    //     name: "Takeout",
    //     id: "5cc1f333df245c427cc2664b",
    //   },
    //   {
    //     name: "Sultan's Dine",
    //     id: "5d96d1205e63182160a5dd85",
    //   },
    //   {
    //     name: "Kazi Foods",
    //     id: "5cc1fb51df245c427cc26652",
    //   },
    // ];

    featuredArr.map((info) => {
      axios
        .get(`https://foodhub-api.herokuapp.com/restaurant/details/${info.id}`)
        .then((resp) =>
          setImages((prevState) => [...prevState, resp.data.data.banner_image])
        );
    });
  }, [featuredArr]);

  return (
    <div>
      <p>Featured Restauants</p>
      {images.map((item) => (
        <img
          style={{
            height: "150px",
            width: "230px",
            padding: "10px",
          }}
          src={item}
          alt={"restaurant banner pictures"}
          key={item}
        ></img>
      ))}
    </div>
  );
}
