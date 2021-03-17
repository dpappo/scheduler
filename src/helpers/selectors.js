export function getAppointmentsForDay(state, name) {
  const exportArray = []

  for (let i = 0; i < state.days.length; i++) {
    if(state.days[i].name === name){
      for (let j = 0; j < state.days[i].appointments.length; j++) {
        exportArray.push(state.appointments[state.days[i].appointments[j]])
      }
      console.log("exportArray: ", exportArray)
      return exportArray
    }
  }

  return [];
}
