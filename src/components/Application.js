import React, {useState, useEffect} from "react";
import DayList from "./DayList"
import Appointment from './Appointment/index.js'
import axios from "axios";
import {getAppointmentsForDay, getInterviewersForDay, getInterview} from "../helpers/selectors"
//import getInterview from "../helpers/selectors"
import "components/Application.scss";


export default function Application(props) {
  const [state, setState] = useState({
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    currentDay: "Monday",
    appointments: {},
    interviewers: []
  })
  
  useEffect(() => {

    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({...prev, days:all[0].data, appointments:all[1].data, interviewers:all[2].data}))
    })
    
  }, [])

  console.log("state: ", state)

  const dailyAppointments = getAppointmentsForDay(state, state.currentDay);
  const dailyInterviewers = getInterviewersForDay(state, state.currentDay);

  const setDay = (day) => setState(prev => ({...prev, currentDay: day}))

  function bookInterview(id, interview) {
    const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
    };

  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => setState(prev => ({...prev, appointments})))
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => setState(prev => ({...prev})))
  }


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
        console.log("interview obj: ", interview)
          return <Appointment 
            key={appointment.id} 
            id={appointment.id} 
            {...appointment}
            interview={interview} 
            interviewers={dailyInterviewers}
            bookInterview={bookInterview}
            cancelInterview={cancelInterview}
            />})}
        <Appointment key="last" time="9pm" />
      </section>
    </main>
  );
}
