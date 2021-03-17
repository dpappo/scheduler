import React, {useState, useEffect} from "react";
import DayList from "./DayList"
import Appointment from './Appointment/index.js'
import axios from "axios";
import getAppointmentsForDay from "../helpers/selectors"
import "components/Application.scss";

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//     interview: {
//       student: "Dan Pappo",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "5pm",
    
//   },
//   {
//     id: 5,
//     time: "7pm",
//     interview: {
//       student: "Said",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   }
// ];



export default function Application(props) {
  const [state, setState] = useState({
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    currentDay: "Monday",
    appointments: {}
  })
  
  useEffect(() =>{
    axios.get("http://localhost:8001/api/appointments")
      .then(response => {
        setAppointments(response.data)
      })
  }, [])

  useEffect(() =>{
    axios.get("http://localhost:8001/api/days")
      .then(response => {
        setDays(response.data)
      })
  }, [])

  console.log(state)

  const dailyAppointments = getAppointmentsForDay(state, state.currentDay);
  console.log("dailyAppointments: " + JSON.stringify(dailyAppointments))

  const setDays = (day) => setState(prev => ({...prev, days: day}))
  const setDay = (day) => setState(prev => ({...prev, currentDay: day}))
  const setAppointments = (appt) => setState(prev => ({...prev, appointments: appt}))

  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">

<DayList
  days={state.days}
  day={state.currentDay}
  setDay={day => setDay(day)}
/>

</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment) => <Appointment key={appointment.id} id={appointment.id} {...appointment} />)}
        <Appointment key="last" time="9pm" />
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
