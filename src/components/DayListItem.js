import React from "react";
const classNames = require('classnames');

export default function DayListItem(props) {
  let listClass = classNames({"selected": props.selected});
  
  return (
    <li className={listClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  )
}