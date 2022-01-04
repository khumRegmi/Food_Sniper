import React, { useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";

import classes from "./app.module.css";
import Homepage from "./HomePage/Homepage";
import Blogs from "./Blogs/Blogs";
import SignIn from "./Auth/SignIn";
import UserProfile from "./Components/UserProfile";
import Cart from "../src/Components/Cart";

import SearchResults from "./HomePage/SearchResults";
import RestaurantPage from "./Restaurant/RestaurantPage";

export const SignInCtx = React.createContext();

function App() {
  const [signIn, setSignIn] = useState(false);
  const [nameUser, setNameUser] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [authUserId, setAuthUserId] = useState("");

  const [cart, setCart] = useState([]);

  // const history = useHistory();

  return (
    <BrowserRouter>
      <Navbar bg="dark" variant="dark" className={classes.nav}>
        <Container>
          <Navbar.Brand style={{ fontFamily: "fantasy", fontSize: "30px" }}>
            <Link to="/">Food Sniper</Link>
          </Navbar.Brand>
          <Nav
            className="me-auto"
            style={{
              marginLeft: "100px",
              fontSize: "25px",
              textDecoration: "none",
            }}
          >
            <Link to="/" className={classes.link}>
              HOME
            </Link>
            <Link to="/blogs" className={classes.link}>
              BLOGS
            </Link>
            {!signIn && (
              <Link to="/auth" className={classes.link}>
                SIGN IN
              </Link>
            )}
            {signIn && (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Link to="/userprofile" className={classes.link}>
                  USER PROFILE
                </Link>
                <Link
                  to="/"
                  className={classes.link}
                  onClick={() => setSignIn(false)}
                >
                  SIGN OUT
                </Link>
                <Link to="/cart" className={classes.link}>
                  CART
                </Link>
              </div>
            )}
          </Nav>
        </Container>
      </Navbar>

      <Switch>
        <SignInCtx.Provider
          value={{
            signIn,
            setSignIn,
            authUserId,
            setAuthUserId,
            nameUser,
            setNameUser,
            emailUser,
            setEmailUser,
            cart,
            setCart,
          }}
        >
          <Route exact path="/" component={Homepage}></Route>
          <Route exact path="/searchResults/:foodName">
            <SearchResults />
          </Route>
          <Route exact path="/blogs">
            <Blogs />
          </Route>
          <Route exact path="/restaurant/:key">
            <RestaurantPage />
          </Route>
          <Route exact path="/auth">
            <SignIn />
          </Route>
          <Route exact path="/userProfile">
            <UserProfile />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
        </SignInCtx.Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
