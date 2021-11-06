import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Avatar from "react-avatar";
import MealCard from "../UI/MealCard";

import { SignInCtx } from "../App";

const RestaurantPage = ({ google, locations = [] }) => {
  const { cart, setCart } = useContext(SignInCtx);

  const restName = useParams().key.toLowerCase();

  const [addornot, setAddornot] = useState("+ Add");

  const [showAdd, setShowAdd] = useState(true);

  const [about, setAbout] = useState(true);
  const [menu, setMenu] = useState(false);
  const [review, setReview] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [reviewLoading, setReviewLoading] = useState(true);

  const [arr, setArr] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`https://foodhub-api.herokuapp.com/restaurant/details/${restName}`)
      .then((resp) => {
        setArr([resp.data.data]);

        setIsLoading(false);
      });

    axios
      .get(
        `https://foodhub-api.herokuapp.com/restaurant/review/5cc1f333df245c427cc2664b`
      )
      //   https://foodhub-api.herokuapp.com/restaurant/review/5cc1f333df245c427cc2664b
      .then((resp) => {
        setReviews([...resp.data.data]);
        setReviewLoading(false);
      });
  }, []);

  // console.log(arr);

  const aboutHandler = () => {
    setAbout(true);
    setMenu(false);
    setReview(false);
  };

  const menuHandler = () => {
    setAbout(false);
    setMenu(true);
    setReview(false);
  };

  const reviewHandler = () => {
    setAbout(false);
    setMenu(false);
    setReview(true);
  };

  return (
    <div>
      {isLoading && <h1>Page is laoding</h1>}

      {!isLoading && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "15px 20px 0px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{
              width: "70%",
              height: "450px",
              margin: "0px auto 0px",
              display: "block",
            }}
            src={`${arr[0].banner_image}`}
            alt="restaurant 1"
          ></img>
          <div
            style={{
              border: "solid",
              borderRadius: "30px",
              padding: "20px",
              width: "50%",
              backgroundColor: "lightgrey",
            }}
          >
            <div
              style={{
                display: "flex",
                margin: "-30px 200px 0px",
                justifyContent: "space-around",
              }}
            >
              <Button variant="info" onClick={aboutHandler}>
                About
              </Button>
              <Button variant="info" onClick={menuHandler}>
                Menu
              </Button>
              <Button variant="info" onClick={reviewHandler}>
                Reviews
              </Button>
            </div>

            <p
              style={{
                fontFamily: "fantasy",
                fontStyle: "italic",
                marginTop: "15px",
                fontSize: "25px",
                display: "flex",
                justifyContent: "center",
              }}
            ></p>
            {about && (
              <div>
                <h4 style={{ fontSize: "25px", fontFamily: "serif" }}>
                  Location
                </h4>
                <h5 style={{ color: "black", margin: "-10px auto 15px" }}>
                  {arr[0].address.area} , {arr[0].address.district}
                </h5>
                <h4 style={{ fontSize: "25px", fontFamily: "serif" }}>
                  Opening Hours:{" "}
                </h4>
                <h5 style={{ color: "black", margin: "-10px auto 15px" }}>
                  {arr[0].hour.start} to {arr[0].hour.end}
                </h5>
                <h4
                  style={{
                    fontSize: "25px",
                    fontFamily: "serif",
                    marginBottom: "-5px",
                  }}
                >
                  Socials
                </h4>
                <a
                  style={{ marginRight: "15px", textDecoration: "none" }}
                  href={`https://www.facebook.com/`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook
                </a>
                <a
                  style={{
                    marginRight: "15px",
                    textDecoration: "none",
                    color: "red",
                  }}
                  href={`https://www.instagram.com/?hl=en`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>

                <a
                  style={{ textDecoration: "none", color: "purple" }}
                  href={`https://www.google.com/gmail/about/`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Contact
                </a>
              </div>
            )}

            {menu && (
              <div>
                <h2>Here is our list of items:</h2>
                <form>
                  <MealCard>
                    <ul>
                      {arr[0].menu.map((item) => (
                        <li key={item._id}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              padding: "20px",
                              border: "solid lightyellow",
                              borderRadius: "20px",
                              backgroundColor: "chocolate",
                            }}
                          >
                            <div style={{ width: "400px" }}>
                              <h5>{item.name} </h5>
                              <h6> ${item.unit_price} </h6>
                            </div>
                            <div
                              style={{
                                width: "60px",
                                height: "40px",
                                border: "solid, black",
                                backgroundColor: "white",
                                borderRadius: "15px",
                                cursor: "pointer",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              // onClick={() => setShowAdd(!showAdd)}
                              onClick={() => {
                                setCart((prevState) => [...prevState, "def"]);
                              }}
                            >
                              {/* {showAdd ? "Add" : "Remove"} */}
                              Add
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <button type="submit">
                      <Link to="/cart"> Go to Cart </Link>
                    </button>
                  </MealCard>
                </form>
              </div>
            )}

            {review && reviewLoading && <div>Review is loading</div>}

            {review && !reviewLoading && (
              <div>
                <ul
                  style={{
                    backgroundColor: "lightblue",
                    listStyle: "none",
                  }}
                >
                  {reviews.map((item) => (
                    <li
                      key={item._id}
                      style={{
                        border: "solid ",
                        marginBottom: "10px",
                        borderRadius: "15px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          padding: "10px",
                        }}
                      >
                        <Avatar
                          size="25"
                          round="20px"
                          text="15px"
                          marginRight="10px"
                          name={item.userId.username}
                        />
                        <h4 style={{ color: "red" }}>{item.userId.username}</h4>
                      </div>
                      <p style={{ padding: "10px", marginTop: "-10px" }}>
                        "{item.comment}"
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantPage;

// {
//   /* <a
//               href={`https:${arr[0].social.facebook}`}  //dynamic
//               target="_blank"
//               rel="noreferrer"
//             >
//               Facebook1
//             </a> */
// }
