import classes from "./Card.module.css";
import bgPizza from "../HomePage/assets/backgroundPizza.jpg";
const Card = (props) => {
  return (
    <div
      style={{
        backgroundImage: `url(${bgPizza})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className={classes.card}
    >
      {props.children}
    </div>
  );
};

// just pushing into girhub

export default Card;
