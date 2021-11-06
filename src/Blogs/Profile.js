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
      {/* <h2 className={classes.follow}> */}
      <a
        className={classes.follow}
        href={`https://www.facebook.com/profile.php?id=100006011928461`}
        target="_blank"
        rel="noreferrer"
      >
        Follow
      </a>
      {/* </h2> */}
    </div>
  );
};

export default Profile;
