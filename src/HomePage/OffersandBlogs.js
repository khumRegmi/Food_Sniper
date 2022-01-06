import React from "react";
import { useHistory } from "react-router-dom";
import Card from "./Card";
import classes from "./OffersandBlogs.module.css";

import offer1 from "./assets/Offers/offer1.jpeg";
import offer2 from "./assets/Offers/offer2.jpeg";

import Profile from "./Profile";

import pic from "./assets/Profile/EmailPP.jpg";

import burger from "./assets/Burger.jpg";
import pizza from "./assets/Pizza.jpg";
import coffee from "./assets/Coffee.jpg";

const OffersandBlogs = () => {
  let arr = [
    {
      image: burger,
      label: "Burger",
    },
    {
      image: pizza,
      label: "Pizza",
    },
    {
      image: burger,
      label: "Pasta",
    },
    {
      image: coffee,
      label: "Coffee",
    },
    {
      image: burger,
      label: "Pocket Friendly",
    },
    {
      image: burger,
      label: "Delivery",
    },
  ];

  const title = {
    marginLeft: "50%",
    padding: "5px",
    backgroundColor: "orange",
    width: "100vh",
    fontFamily: "cursive",
    textAlign: "center",
  };

  const entireBlog = {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    backgroundColor: "yellowgreen",
    marginRight: "10px",
  };

  const history = useHistory();

  return (
    <div style={{ width: "100vh", minWidth: "100vh" }}>
      <h1 style={title}>Featured Items</h1>
      <Card className={classes.bg}>
        <div
          style={{
            marginLeft: "-10px",
            display: "flex",
            flexDirection: "row",
            position: "relative",
          }}
        >
          {arr.map((item) => (
            <div key={item.label}>
              <img
                className={classes.img}
                src={item.image}
                alt={item.label}
                onClick={() =>
                  history.push(`/searchResults/${item.label.toLowerCase()}`)
                }
              ></img>
              <h3 className={classes.label}>{item.label}</h3>
            </div>
          ))}
        </div>
      </Card>

      <div className={classes.offerTitle}>
        <h1 style={title}>Top Offers Today</h1>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>
            <img
              className={classes.imageSize1}
              src={offer1}
              alt="offer 1"
            ></img>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "-60px",
            }}
          >
            <Card>
              <img
                className={classes.imageSize2}
                src={offer2}
                alt="offer 2"
              ></img>
              <img
                className={classes.imageSize2}
                src={offer2}
                alt="offer 3"
              ></img>
            </Card>
            <Card>
              <img
                className={classes.imageSize2}
                src={offer1}
                alt="offer 4"
              ></img>
              <img
                className={classes.imageSize2}
                src={offer2}
                alt="offer 5"
              ></img>
            </Card>
          </div>
        </div>
      </div>

      <div style={{ marginLeft: "10px" }}>
        <h1 style={title}>Top Blogs Today</h1>
        <div className={classes.divBlogs}>
          <div style={entireBlog}>
            <img
              className={classes.imgSize}
              src={"https://i.ibb.co/7zjjjc7/Chicken-soup.jpg"}
              alt="item1"
            />
            <div>
              <p className={classes.para}>
                Hands down. Best Ckicken soup in town :)
              </p>
              <Profile name="Khum" date="2021/9/22" pic={pic} />
            </div>
          </div>
          <br />
          <div style={entireBlog}>
            <img
              className={classes.imgSize}
              src={"https://i.ibb.co/MVCBqXP/Chipotle.jpg"}
              alt="item2"
            />
            <p className={classes.para}>
              ALways good to have a bowl of chipotle. 7/10{" "}
            </p>
            {/* <Profile name="kpr135" date="2021/10/12" pic={pic} /> */}
            <Profile name="Khum" date="2021/9/22" pic={pic} />
          </div>

          <div style={entireBlog}>
            <img
              className={classes.imgSize}
              src={"https://i.ibb.co/HgnXRqt/Chicken-seekh.jpg"}
              alt="item3"
            />
            <p className={classes.para}>Taste so gooood. </p>
            <Profile name="Khum" date="2021/12/1" pic={pic} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffersandBlogs;
