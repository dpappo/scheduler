import React from "react";
import "components/DayListItem.scss";
const classNames = require('classnames');

const formatSpots = function(spots) {
  if (spots > 1) {
    return spots + " spots remaining"
  } else if (spots === 0) {
    return "no spots remaining"
  } else {
    return spots + " spot remaining"
  }
}

export default function DayListItem(props) {
  let listClass = classNames("day-list__item",{
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0}
    );
  
  return (
    <li className={listClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  )
}