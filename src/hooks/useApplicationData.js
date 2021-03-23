import React, {useState, useEffect} from 'react';
import axios from 'axios';


export default function useApplicationData(initial) {
  const [history, setHistory] = useState([initial]);

  const [state, setState] = useState({
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    currentDay: "Monday",
    appointments: {},
    interviewers: [],
  })

  const setDay = (day) => setState(prev => ({...prev, currentDay: day}))


  useEffect(() => {

    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({...prev, days:all[0].data, appointments:all[1].data, interviewers:all[2].data}))
    })
    
  }, [])



  function updateSpots(days, id, value) {
    const newDays = [...days]
    newDays.forEach(day => {
      if(day.appointments.includes(id)) {
        day.spots = parseInt(day.spots) + value
      }
    })
    return newDays;
  }

  function bookInterview(id, interview) {
      const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      
      const days = updateSpots([...state.days], id, -1)

      return axios.put(`/api/appointments/${id}`, { interview })
          .then(() => setState(prev => ({...prev, appointments, days})))
  }

  function editInterview(id, interview) {
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
      const days = updateSpots([...state.days], id, 1)

      return axios.delete(`/api/appointments/${id}`)
        .then(() => setState(prev => ({...prev, days})))
  }

  return {state, setDay, bookInterview, cancelInterview, editInterview, setState};
}