import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useParams, useHistory } from "react-router-dom";
import { Checkmark } from "react-checkmark";
import { Rating } from "react-simple-star-rating";

import axios from "axios";

import Review from "../Components/Review";
import Modal from "../Components/Modal";
import img from "./assets/cross_icon.png";
import Avatar from "react-avatar";
import MealCard from "../UI/MealCard";
import { SignInCtx } from "../App";

const Crossmark = () => {
  return (
    <img
      src={img}
      alt={"cross icon"}
      style={{ height: "20px", width: "20px", borderRadius: "10px" }}
    ></img>
  );
};

const RestaurantPage = () => {
  const { cart, setCart, signIn, authUserId } = useContext(SignInCtx);

  // console.log(cart);
  // console.log(signIn);

  const history = useHistory();
  const restId = useParams().key.toLowerCase();

  const [showAdd, setShowAdd] = useState(true);

  const [about, setAbout] = useState(true);
  const [menu, setMenu] = useState(false);
  const [review, setReview] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [reviewLoading, setReviewLoading] = useState(true);

  const [restArr, setRestArr] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);

  const [rateFood, setRateFood] = useState(0);
  const [rateEnv, setRateEnv] = useState(0);
  const [rateService, setRateService] = useState(0);
  const [ratePrice, setRatePrice] = useState(0);
  const [comment, setComment] = useState("");

  const commentHandler = (event) => {
    setComment(event.target.value);
  };

  var today = new Date();
  var hourOftheDay = today.getHours();

  useEffect(() => {
    axios
      .get(`https://foodhub-api.herokuapp.com/restaurant/details/${restId}`)
      .then((resp) => {
        setRestArr([resp.data.data]);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    !isLoading &&
      axios
        .get(
          `https://foodhub-api.herokuapp.com/restaurant/review/${restArr[0]._id}`
        )
        .then((resp) => {
          setReviews([...resp.data.data]);
          setReviewLoading(false);
        });
  }, [isLoading]);

  // console.log(restArr);
  // !isLoading && console.log(`${restArr[0]._id}`);

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

  const handlePriceRating = (rate) => {
    setRatePrice(rate / 20);
  };

  const handleServiceRating = (rate) => {
    setRateService(rate / 20);
  };

  const handleFoodRating = (rate) => {
    setRateFood(rate / 20);
  };

  const handleEnvironmentRating = (rate) => {
    setRateEnv(rate / 20);
  };

  const restFeatures = {
    display: "flex",
    flexDirection: "row",
    marginTop: "-8px",
  };

  const submitReviewHandler = () => {
    console.log("Review is submitted");
    console.log(
      authUserId,
      rateFood,
      rateEnv,
      ratePrice,
      rateService,
      comment,
      restArr[0]._id
    );
    axios
      .post(
        `https://foodhub-api.herokuapp.com/restaurant/review/${restArr[0]._id}`,
        {
          userId: authUserId,
          food: rateFood,
          service: rateService,
          environment: rateEnv,
          price: ratePrice,
          comment: comment,
        }
      )
      .then((resp) => console.log(resp.data));
    setModalOpen(!modalOpen);
    history.push(`/restaurant/${restArr[0]._id}`);
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
            src={`${restArr[0].banner_image}`}
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
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div>
                    <h4 style={{ fontSize: "25px", fontFamily: "serif" }}>
                      Location
                    </h4>
                    <h5 style={{ color: "black", margin: "-10px auto 15px" }}>
                      {restArr[0].address.area} , {restArr[0].address.district}
                    </h5>
                    <h4 style={{ fontSize: "25px", fontFamily: "serif" }}>
                      Opening Hours:
                    </h4>
                    <h5 style={{ color: "black", margin: "-10px auto 15px" }}>
                      {restArr[0].hour.start} to {restArr[0].hour.end}
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

                    <div>
                      <h1
                        style={{
                          marginTop: "25px",
                          backgroundColor: "darkcyan",
                          textAlign: "center",
                          fontFamily: "fantasy",
                          width: "208%",
                        }}
                      >
                        Features
                      </h1>
                      <div>
                        <div>
                          {restArr[0].features.delivery ? (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <p
                                style={{
                                  width: "110px",
                                  marginRight: "-100px",
                                  textAlign: "right",
                                }}
                              >
                                Delivery
                              </p>
                              <Checkmark size="20px" />
                            </div>
                          ) : (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <p style={{ width: "110px", textAlign: "right" }}>
                                Delivery
                              </p>
                              <Crossmark />
                            </div>
                          )}
                          {restArr[0].features.ac ? (
                            <div style={restFeatures}>
                              <p
                                style={{
                                  width: "110px",
                                  marginRight: "-100px",
                                  textAlign: "right",
                                }}
                              >
                                AC
                              </p>
                              <Checkmark size="20px" />
                            </div>
                          ) : (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <p
                                style={{
                                  width: "110px",
                                  marginTop: "-8px",
                                  textAlign: "right",
                                }}
                              >
                                AC{" "}
                              </p>
                              <Crossmark />
                            </div>
                          )}
                          {restArr[0].features.wifi ? (
                            <div style={restFeatures}>
                              <p
                                style={{
                                  width: "110px",
                                  marginRight: "-100px",
                                  textAlign: "right",
                                }}
                              >
                                Wifi
                              </p>
                              <Checkmark size="20px" />
                            </div>
                          ) : (
                            <div
                              style={{ display: "flex", flexDirection: "row" }}
                            >
                              <p
                                style={{
                                  width: "110px",
                                  marginTop: "-8px",
                                  textAlign: "right",
                                }}
                              >
                                Wifi{" "}
                              </p>
                              <Crossmark />
                            </div>
                          )}
                          {restArr[0].features.smoking_zone ? (
                            <div style={restFeatures}>
                              <p
                                style={{
                                  width: "110px",
                                  marginRight: "-100px",
                                  textAlign: "right",
                                }}
                              >
                                Smoking Zone
                              </p>
                              <Checkmark size="20px" />
                            </div>
                          ) : (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <p
                                style={{
                                  marginTop: "-8px",
                                  textAlign: "right",
                                }}
                              >
                                Smoking Zone{" "}
                              </p>
                              <Crossmark />
                            </div>
                          )}
                          {restArr[0].features.reservation ? (
                            <div style={restFeatures}>
                              <p
                                style={{
                                  width: "110px",
                                  marginRight: "-100px",
                                  textAlign: "right",
                                }}
                              >
                                Reservations
                              </p>
                              <Checkmark size="20px" />
                            </div>
                          ) : (
                            <div
                              style={{ display: "flex", flexDirection: "row" }}
                            >
                              <p
                                style={{
                                  width: "110px",
                                  marginTop: "-8px",
                                  textAlign: "right",
                                }}
                              >
                                Reservations{" "}
                              </p>
                              <Crossmark />
                            </div>
                          )}
                          {restArr[0].features.parking ? (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                marginTop: "-8px",
                              }}
                            >
                              <p
                                style={{
                                  width: "110px",
                                  marginRight: "-100px",
                                  textAlign: "right",
                                }}
                              >
                                Parking
                              </p>
                              <Checkmark size="20px" />
                            </div>
                          ) : (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <p
                                style={{
                                  width: "110px",
                                  marginTop: "-8px",
                                  textAlign: "right",
                                }}
                              >
                                Parking
                              </p>
                              <Crossmark />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    {hourOftheDay > parseInt(restArr[0].hour.start) &&
                    hourOftheDay < parseInt(restArr[0].hour.end) + 12 ? (
                      <div
                        style={{
                          color: "orange",
                          backgroundColor: "green",
                          height: "90px",
                          width: "90px",
                          display: "flex",
                          alignItems: "center",
                          alignContent: "center",
                          borderRadius: "30%",
                          marginLeft: "100px",
                        }}
                      >
                        WE'RE OPEN!!!!!!
                      </div>
                    ) : (
                      <div
                        style={{
                          color: "white",
                          backgroundColor: "red",
                          height: "90px",
                          width: "90px",
                          display: "flex",
                          alignItems: "center",
                          alignContent: "center",
                          borderRadius: "30%",
                          marginLeft: "100px",
                        }}
                      >
                        CLOSED !!!
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <div>
                    <h1
                      style={{
                        marginTop: "25px",
                        backgroundColor: "darkcyan",
                        textAlign: "center",
                        fontFamily: "fantasy",
                      }}
                    >
                      Gallery
                    </h1>
                    {restArr[0].images.map((item) => (
                      <img
                        style={{
                          height: "200px",
                          width: "300px",
                          padding: "10px",
                        }}
                        src={item}
                        alt={"restaurant customer pictures"}
                        key={item}
                      ></img>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {menu && (
              <div>
                {!signIn && <p>Please signin to place an order. Thank you!</p>}
                {signIn && (
                  <button
                    type="submit"
                    style={{
                      display: "flex",
                      alignContent: "end",
                      color: "blue",
                      backgroundColor: "lightgreen",
                      textDecoration: "none",
                      marginLeft: "80%",
                    }}
                  >
                    <Link style={{ textDecoration: "none" }} to="/cart">
                      {" "}
                      Go to Cart{" "}
                    </Link>
                  </button>
                )}
                <h2>Here is list of our items:</h2>
                <form>
                  <MealCard>
                    <ul>
                      {restArr[0].menu.map((item) => (
                        <li key={item._id}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              padding: "20px",
                              // border: "solid lightyellow",
                              border: "none",
                              borderRadius: "20px",
                              // backgroundColor: "chocolate",
                              borderTop: "3px dotted ",
                            }}
                          >
                            <div style={{ width: "300px", height: "30px" }}>
                              <h5 style={{ fontFamily: "cursive" }}>
                                {item.name}{" "}
                              </h5>
                              <h6
                                style={{
                                  marginTop: "-10px",
                                  fontFamily: "monospace",
                                  marginLeft: "80%",
                                }}
                              >
                                {" "}
                                ${(item.unit_price / 25).toFixed(2)}{" "}
                              </h6>
                            </div>

                            {signIn && (
                              <div
                                style={{
                                  width: "60px",
                                  height: "30px",
                                  border: "solid, black",
                                  backgroundColor: "red",
                                  borderRadius: "15px",
                                  cursor: "pointer",
                                  display: "flex",
                                  justifyContent: "center",
                                  // alignItems: "center",
                                }}
                                onClick={() => {
                                  alert(
                                    `${item.name} has been added to your cart`
                                  );
                                  setCart((prevState) => [
                                    ...prevState,
                                    {
                                      key: uuid(),
                                      itemName: item["name"],
                                      price: item["unit_price"],
                                    },
                                  ]);
                                }}
                              >
                                <p
                                  style={{
                                    marginTop: "2px",
                                  }}
                                >
                                  Add
                                </p>
                              </div>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </MealCard>
                </form>
              </div>
            )}

            {review && reviewLoading && (
              <div>Review is loading. Please wait</div>
            )}

            {review && !reviewLoading && (
              <div>
                <Modal
                  open={modalOpen}
                  // onClose={() => setModalOpen(!modalOpen)}
                >
                  <button
                    onClick={() => setModalOpen(false)}
                    style={{
                      backgroundColor: "lightcoral",
                      borderRadius: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    Go back
                  </button>
                  <form>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <h3
                        style={{
                          fontFamily: "initial",
                          marginBottom: "-10px",
                          width: "160px",
                        }}
                      >
                        Food
                      </h3>
                      <Rating
                        onClick={handleFoodRating}
                        ratingValue={rateFood}
                      />
                    </div>
                    <hr />

                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <h3
                        style={{
                          fontFamily: "initial",
                          marginBottom: "-10px",
                          width: "160px",
                        }}
                      >
                        Environment
                      </h3>
                      <Rating
                        onClick={handleEnvironmentRating}
                        ratingValue={rateEnv}
                      />
                    </div>

                    <hr />

                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <h3
                        style={{
                          fontFamily: "initial",
                          marginBottom: "-10px",
                          width: "160px",
                        }}
                      >
                        Service
                      </h3>
                      <Rating
                        onClick={handleServiceRating}
                        ratingValue={rateService}
                      />
                    </div>

                    <hr />
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <h3
                        style={{
                          fontFamily: "initial",
                          marginBottom: "-10px",
                          width: "160px",
                        }}
                      >
                        Price
                      </h3>
                      <Rating
                        onClick={handlePriceRating}
                        ratingValue={ratePrice}
                      />
                    </div>

                    <hr />
                    <h3 style={{ fontFamily: "initial", marginBottom: "auto" }}>
                      Comments
                    </h3>

                    <textarea
                      type="text"
                      style={{ width: "400px", height: "100px" }}
                      value={comment}
                      onChange={commentHandler}
                    ></textarea>
                    <br />
                    <input
                      type="submit"
                      style={{ backgroundColor: "green", marginTop: "20px" }}
                      value="Submit Review"
                      onClick={submitReviewHandler}
                    />
                  </form>
                </Modal>

                <button
                  style={{
                    backgroundColor: "orange",
                    width: "200px",
                    borderRadius: "10px",
                  }}
                  onClick={() => setModalOpen(true)}
                >
                  Add Review
                </button>
                <div
                  style={{
                    textAlign: "right",
                    display: "flex",
                    flexDirection: "column",
                    fontFamily: "monospace",
                  }}
                >
                  <h3> {restArr[0].review.average.toFixed(2)}/5 </h3>
                  <h4> {restArr[0].review.count} customer ratings </h4>
                </div>
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
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          padding: "5px",
                        }}
                      >
                        <Avatar
                          size="25"
                          round="20px"
                          text="15px"
                          marginRight="10px"
                          name={
                            item.userId === null
                              ? "No Name"
                              : item.userId.username
                          }
                        />
                        <h4 style={{ color: "red", marginLeft: "10px" }}>
                          {item.userId === null
                            ? "No Name"
                            : item.userId.username}
                        </h4>
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
//               href={`https:${restArr[0].social.facebook}`}  //dynamic
//               target="_blank"
//             >
//               Facebook1
//             </a> */
//               rel="noreferrer"
// }

// From Mentor Samyo
// /// React
// const [selectedItems, setSelectedItems] = useState([]);

// // whenever add button is clicked
// const handleItemAddOrRemove = (id) => {
//   if (selectedItems.includes(id)) {
//     // Remove
//     const newItems = selectedItems.filter(item => item.id !== id);
//     return setSelectedItems(newItems);
//   }
//   // Add
//   setSelectedItems(...selectedItems, newItemId);
// };

// // when rendering the Button
// const label = selectedItems.includes(menuId) ? 'Remove' : 'Add';
// <Button onClick={handleItemAddOrRemove}>{label}</Button>
