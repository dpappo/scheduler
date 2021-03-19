import React, {useState} from 'react';
import axios from 'axios';

export default function useApplicationData(initial) {
  const [history, setHistory] = useState([initial]);

  const [state, setState] = useState({
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    currentDay: "Monday",
    appointments: {},
    interviewers: []
  })

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




  return {state, setDay, bookInterview, cancelInterview, setState};

}