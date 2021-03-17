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
export function getInterview(state, interview) {

  if (interview){
    return {interviewer: state.interviewers[interview.interviewer], student: interview.student}
  }

  return null;
}

