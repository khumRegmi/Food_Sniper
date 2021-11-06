import React, { useContext } from "react";
import classes from "./UserProfile.Module.css";

import { SignInCtx } from "../App";

export default function UserProfile() {
  const { nameUser, emailUser } = useContext(SignInCtx);

  return (
    <div className={classes.page}>
      <div className={classes.container}>
        <p className={classes.name}>User Name : {nameUser}</p>
        <p className={classes.email}>Email: {emailUser}</p>
      </div>

      <div>
        <h5 className={classes.addRest}>
          Please email at 'addRest@gmail.com' to add your restaurants
        </h5>
      </div>
    </div>
  );
}
