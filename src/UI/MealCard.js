import classes from "./MealCard.module.css";

const MealCard = (props) => {
  return <div className={classes.card}>{props.children}</div>;
};
// just pushing into girhub

export default MealCard;
