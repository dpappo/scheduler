import React from "react";
import DayListItem from "components/DayListItem";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];


export default function DayList(props) {
  const listOfDays = days.map((day, index) => 
    <DayListItem key={index} 
      {...day} 
      selected={day.name === props.day} 
      setDay={props.setDay}/>)
  
    return <ul>{listOfDays}</ul>
}