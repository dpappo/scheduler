import React, {useState, useEffect} from "react";
import axios from "axios";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const [days, setDays] = useState([]);
  
  useEffect(() =>{
    axios.get("/api/days")
      .then(response => {
        setDays(response.data)
      })
  }, [])

  const listOfDays = days.map((day, index) => 
    <DayListItem key={index} 
      {...day} 
      selected={day.name === props.day}
      spots={props.days[index].spots} 
      setDay={props.setDay}/>)
  
    return <ul>{listOfDays}</ul>
}