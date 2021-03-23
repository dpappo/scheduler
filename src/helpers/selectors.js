export function getAppointmentsForDay(state, name) {
  const exportArray = []
  for (let i = 0; i < state.days.length; i++) {
    if(state.days[i].name === name){
      for (let j = 0; j < state.days[i].appointments.length; j++) {
        exportArray.push(state.appointments[state.days[i].appointments[j]])
      }
      return exportArray
    }
  }
  
  return [];
}
export function getInterviewersForDay(state, dayName) {
  const exportArray = []

  for (let i = 0; i < state.days.length; i++) {
    if(state.days[i].name === dayName){
      for (let j = 0; j < state.days[i].interviewers.length; j++) {
        exportArray.push(state.interviewers[state.days[i].interviewers[j]])
      }
      return exportArray
    }
  }

  return [];
}

export function getInterview(state, interview) {

  if (interview){
    return {interviewer: state.interviewers[interview.interviewer], student: interview.student}
  }

  return null;
}

