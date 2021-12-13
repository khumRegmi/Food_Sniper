import React, { useContext, useState } from "react";
import axios from "axios";
import { SignInCtx } from "../App";

import classes from "./SignIn.module.css";
import { useHistory } from "react-router";

export default function SignIn() {
  const history = useHistory();
  const { setSignIn, setNameUser, setEmailUser, setAuthUserId } =
    useContext(SignInCtx);

  const [hasAccount, setHasAccount] = useState(true);

  const [userInfo, setUserInfo] = useState({
    userName: "",
    emailAddr: "",
    passwordIn: "",
    confirmPasswordIn: "",
  });

  const [logininfo, setLogininfo] = useState({
    loginName: "",
    loginPassword: "",
  });

  function validateEmail(elementValue) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(elementValue);
  }

  const handleSignInInfo = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLoginInfo = (e) => {
    const { name, value } = e.target;
    setLogininfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const signinHandler = () => {
    if (
      userInfo.userName === "" ||
      userInfo.emailAddr === "" ||
      userInfo.passwordIn === "" ||
      userInfo.confirmPasswordIn === ""
    ) {
      alert("All fields should be filled");
      return;
    }
    if (userInfo.passwordIn !== userInfo.confirmPasswordIn) {
      alert("Passwords do not match");
      return;
    }

    if (!validateEmail(userInfo.emailAddr)) {
      alert("Incrrect Email");
      return;
    }
    axios
      .post(`https://foodhub-api.herokuapp.com/auth/register`, {
        username: userInfo.userName,
        email: userInfo.emailAddr,
        password: userInfo.passwordIn,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setNameUser(userInfo.userName);
        setEmailUser(userInfo.emailAddr);
        setSignIn(true);
      });
    history.push("/");
  };

  const loginHandler = () => {
    if (!logininfo.loginName || !logininfo.loginPassword) {
      alert("USername or password can not be empty");
      return;
    }
    axios
      .post(`https://foodhub-api.herokuapp.com/auth/login`, {
        username: logininfo.loginName,
        password: logininfo.loginPassword,
      })
      .then((resp) => {
        console.log(resp.data);
        setNameUser(resp.data.data.username);
        setEmailUser(resp.data.data.email);
        setAuthUserId(resp.data.data._id);
        setSignIn(true);
      });
    history.push("/");
  };

  return (
    <div>
      {hasAccount && (
        <div className={classes.home}>
          <br />
          <div className={classes.login}>
            <input
              className={classes.userName}
              placeholder="Username"
              name="loginName"
              value={logininfo.loginName}
              onChange={handleLoginInfo}
            ></input>
            <input
              className={classes.password}
              type="password"
              placeholder="Password"
              name="loginPassword"
              value={logininfo.loginPassword}
              onChange={handleLoginInfo}
            ></input>

            <button className={classes.button} onClick={loginHandler}>
              Login
            </button>
          </div>

          <div className={classes.signup}>
            <p style={{ fontSize: "25px", color: "white" }}>
              Don't have an account?
            </p>
            <button
              onClick={() => setHasAccount(false)}
              style={{ color: "white", backgroundColor: "blue" }}
            >
              SignUp
            </button>
          </div>
        </div>
      )}

      {!hasAccount && (
        <div className={classes.home}>
          <br />
          <div className={classes.login}>
            <p style={{ marginTop: "100px" }}>Already have an account?</p>
            <button
              onClick={() => setHasAccount(!hasAccount)}
              style={{ color: "white", backgroundColor: "blue" }}
            >
              Login
            </button>
          </div>
          <div
            className={classes.signup}
            style={{ height: "450px", marginTop: "55px" }}
          >
            <input
              className={classes.userName}
              placeholder="Name"
              value={userInfo.userName}
              name="userName"
              onChange={handleSignInInfo}
            ></input>
            <input
              className={classes.userName}
              placeholder="email"
              value={userInfo.emailAddr}
              name="emailAddr"
              onChange={handleSignInInfo}
            ></input>
            <input
              className={classes.password}
              type="password"
              placeholder="Password"
              name="passwordIn"
              onChange={handleSignInInfo}
            ></input>
            <input
              className={classes.password}
              type="password"
              placeholder="Confirm Password"
              name="confirmPasswordIn"
              onChange={handleSignInInfo}
            ></input>

            <button
              className={classes.button}
              type="submit"
              style={{ marginLeft: "95px" }}
              onClick={signinHandler}
            >
              Signup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
