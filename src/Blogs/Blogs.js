import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Profile from "./Profile";
import Card from "./Card";
import blogClasses from "./Blogs.Module.css";

import pp2 from "./assets/spring-pic.png";
import pp from "./assets/EmailPP.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "70vh",
    width: "100%",
    //from public folder
    backgroundImage: `url(./assets/blogging.jpeg)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    marginBottom: "35px",
  },
}));

let today = new Date();
let date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

export default function Blogs({ trial }) {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.root}>
        <h1
          style={{
            backgroundColor: "red",
            width: "100%",
            height: "auto",
            textAlign: "center",
            fontSize: "35pt",
            fontFamily: "monospace",
          }}
        >
          This is the Blogs page , {trial}
        </h1>
        <p
          style={{
            position: "sticky",
            fontFamily: "cursive",
            fontSize: "28pt",
            backgroundColor: "whitesmoke",
            width: "60%",
            color: "brown",
            textAlign: "center",
          }}
        >
          Eat, Blog, Repeat :)
        </p>

        <p
          style={{
            width: "50%",
            backgroundColor: "burlywood",
            fontSize: "25pt",
            fontFamily: "fantasy",
          }}
        >
          Welcome People!
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Card>
          <h1
            style={{
              textAlign: "center",
              color: "red",
              fontFamily: "cursive",
            }}
          >
            Top Bloggers this week
          </h1>
          <div className={blogClasses.topBloggers}>
            <Card className={blogClasses.card}>
              <Profile name="Mark" date={date} pic={pp} />{" "}
            </Card>

            <Card className={blogClasses.card}>
              <Profile name="Khum" date={date} pic={pp} />{" "}
            </Card>

            <Card className={blogClasses.card}>
              <Profile name="Joe" date={date} pic={pp2} />{" "}
            </Card>
          </div>
        </Card>

        <div
          style={{ display: "flex", flexDirection: "column", width: "800px" }}
        >
          <div
            style={{
              backgroundColor: "violet",
              display: "flex",
              flexDirection: "row",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "20px",
            }}
          >
            <h4 style={{ fontFamily: "cursive" }}>
              <Profile name="John" date={date} pic={pp2} />
              Definetly need to check out, Pizza Hut. Such amazing thin-crust
              Chicken Pizzas
            </h4>
          </div>

          <div
            style={{
              backgroundColor: "pink",
              display: "flex",
              flexDirection: "row",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "20px",
            }}
          >
            <h4 style={{ fontFamily: "cursive" }}>
              <Profile name="Khum" date={date} pic={pp} />
              Hot Wings. I am coming back every other day :D
            </h4>
          </div>
          <div
            style={{
              backgroundColor: "wheat",
              display: "flex",
              flexDirection: "row",
              padding: "20px",
              borderRadius: "20px",
            }}
          >
            <h4 style={{ fontFamily: "cursive" }}>
              <Profile name="Khum" date={date} pic={pp} />
              Taco Corners. I love thier Chicken tacos the most. And guacs too.
              :)
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
