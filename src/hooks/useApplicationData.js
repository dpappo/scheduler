import React, {useState} from 'react';
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

//const days = updateSpots([...state.days], id, 1)
//  function checkForInterviews(object) {    
//     const appointments = [];
    
//     for (const item in object) {
//       appointments.push(object[item])
//     }

//     const isNotBooked = appointments.filter(item => item.interview === null)

//     console.log(isNotBooked)

//     const mondayAvail = isNotBooked.filter(item => item.id < 6)
//     const monCount = mondayAvail.length;
//     const tuesdayAvail = isNotBooked.filter(item => item.id > 5 && item.id < 11)
//     const tuesCount = tuesdayAvail.length;

//     const arraySpots = [monCount, tuesCount]
//     setState((prev) => (prev => ({...prev, spotsLeft: arraySpots})))
//   }

//   checkForInterviews(state.appointments)

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
    console.log("state: ", state)
    const days = updateSpots([...state.days], id, 1)
    console.log("state: ", state)
    console.log("days: ", days)

    return axios.delete(`/api/appointments/${id}`)
      .then(() => setState(prev => ({...prev, days})))
  }




  return {state, setDay, bookInterview, cancelInterview, editInterview, setState};

}