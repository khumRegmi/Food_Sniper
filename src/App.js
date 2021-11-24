import React, { useState } from "react";
import classes from "./app.module.css";
import { Container, Navbar, Nav } from "react-bootstrap";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";

import Homepage from "./HomePage/Homepage";
import Blogs from "./Blogs/Blogs";
import SignIn from "./Auth/SignIn";
import UserProfile from "./Components/UserProfile";

import SearchResults from "./HomePage/SearchResults";
import RestaurantPage from "./Restaurant/RestaurantPage";

export const SignInCtx = React.createContext();

function App() {
  const [signIn, setSignIn] = useState(false);
  const [nameUser, setNameUser] = useState("");
  const [emailUser, setEmailUser] = useState("");

  const [cart, setCart] = useState(["abc", "def"]);

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
              marginLeft: "300px",
              fontSize: "25px",
              textDecoration: "none",
            }}
          >
            <Link to="/" className={classes.link}>
              Home
            </Link>
            <Link to="/food-photography" className={classes.link}>
              Food Photography
            </Link>
            <Link to="/blogs" className={classes.link}>
              Blogs
            </Link>
            {signIn && (
              <Link to="/userprofile" className={classes.link}>
                User Profile
              </Link>
            )}
            {signIn && (
              <Link
                to="/"
                className={classes.link}
                onClick={() => setSignIn(false)}
              >
                Sign Out
              </Link>
            )}
            {/* {signIn && (
              <NavDropdown
                style={{
                  marginTop: "-8px",
                  marginLeft: "45px",
                  color: "white",
                }}
                title="Welcome"
              >
                <NavDropdown.Item>
                  <Link to="/userprofile">User Profile</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/" onClick={() => console.log("Okay")}>
                    Sign Out
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            )} */}
            {!signIn && (
              <Link to="/auth" className={classes.link}>
                Sign In
              </Link>
            )}
          </Nav>
        </Container>
      </Navbar>

      <Switch>
        <SignInCtx.Provider
          value={{
            signIn,
            setSignIn,
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
        </SignInCtx.Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
