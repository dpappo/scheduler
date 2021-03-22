import React, {useState, useEffect} from "react";
import DayList from "./DayList"
import Appointment from './Appointment/index.js'
import axios from "axios";
import {getAppointmentsForDay, getInterviewersForDay, getInterview, updateSpots} from "../helpers/selectors"
import useApplicationData from "../hooks/useApplicationData"
import "components/Application.scss";


export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    editInterview,
    cancelInterview,
    setState
  } = useApplicationData();
  
  useEffect(() => {

    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({...prev, days:all[0].data, appointments:all[1].data, interviewers:all[2].data}))
    })
    
  }, [setState])

  const dailyAppointments = getAppointmentsForDay(state, state.currentDay);
  const dailyInterviewers = getInterviewersForDay(state, state.currentDay);


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
          return <Appointment 
            key={appointment.id} 
            id={appointment.id} 
            {...appointment}
            interview={interview} 
            interviewers={dailyInterviewers}
            bookInterview={bookInterview}
            editInterview={editInterview}
            cancelInterview={cancelInterview}
            />})}
        <Appointment key="last" time="9pm" />
      </section>
    </main>
  );
}
