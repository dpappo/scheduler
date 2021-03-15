import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  
  const itemClass = classNames("interviewers__item",
  {"interviewers__item--selected": props.selected})
  
  return (<li className={itemClass} onClick={() => props.setInterviewer(props.name)}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {props.name}
</li>)

}