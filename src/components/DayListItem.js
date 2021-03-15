import React from "react";
import "components/DayListItem.scss";
const classNames = require('classnames');

export default function DayListItem(props) {
  let listClass = classNames("day-list__item",{
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0}
    );
  
  return (
    <li className={listClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  )
}