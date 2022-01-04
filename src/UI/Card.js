import classes from "./Card.module.css";
const Card = (props) => {
  return (
    <div
      style={{
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

export default Card;
