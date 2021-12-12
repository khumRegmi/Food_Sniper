import React from "react";

import classes from "./Profile.module.css";

const Profile = ({ name, date, pic }) => {
  return (
    <div className={classes.division}>
      <img className={classes.pic} src={pic} alt="profilepic"></img>
      <div className={classes.info}>
        <p className={classes.p1}>{name}</p>
        <p className={classes.p2}>{date}</p>
      </div>
      <button
        style={{
          marginTop: "25px",
          color: "red",
          backgroundColor: "lightblue",
          width: "60px",
          height: "35px",
        }}
      >
        Follow
      </button>
    </div>
  );
};

export default Profile;
