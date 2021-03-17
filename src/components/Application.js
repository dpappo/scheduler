import React, {useState, useEffect} from "react";
import DayList from "./DayList"
import Appointment from './Appointment/index.js'
import axios from "axios";
import {getAppointmentsForDay, getInterview} from "../helpers/selectors"
//import getInterview from "../helpers/selectors"
import "components/Application.scss";

export default function Application(props) {
  const [state, setState] = useState({
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    currentDay: "Monday",
    appointments: {},
    interviewers: []
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

  useEffect(() =>{
    axios.get("http://localhost:8001/api/interviewers")
      .then(response => {
        setInterviewer(response.data)
      })
  }, [])

  // console.log("state: ", state)

  const dailyAppointments = getAppointmentsForDay(state, state.currentDay);

  const setDays = (day) => setState(prev => ({...prev, days: day}))
  const setDay = (day) => setState(prev => ({...prev, currentDay: day}))
  const setAppointments = (appt) => setState(prev => ({...prev, appointments: appt}))
  const setInterviewer = (int) => setState(prev => ({...prev, interviewers: int}))


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
        {dailyAppointments.map((appointment) => {
        const interview = getInterview(state, appointment.interview);
        //console.log(interview)
          return <Appointment 
            key={appointment.id} 
            id={appointment.id} 
            {...appointment}
            interview={interview} 
            />})}
        <Appointment key="last" time="9pm" />
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
