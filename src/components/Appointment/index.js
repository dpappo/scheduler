import React, {Fragment} from "react";
import "./styles.scss";
import Header from './Header'
import Show from './Show'
import Empty from './Empty'
import useVisualMode from "../../hooks/useVisualMode"
import Form from './Form'
import Status from './Status'
import Confirm from './Confirm'

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const DELETING = "DELETING";

export default function Appointment(props) {
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

const {bookInterview, cancelInterview} = props;

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

  console.log("interview obj: ", interview)

    transition(SAVING)
    bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      
    
  }

  function erase(id) {

    transition(CONFIRM)
    
  }

  function actualErase(id) {

    transition(DELETING)
    cancelInterview(id)
      .then(() => transition(EMPTY))
      
    
  }

  return <article className="appointment">
  <Header time={props.time} />

  {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
  {mode === SHOW && (
    <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      onDelete={() => erase(props.id)}
      onEdit={() => transition(EDIT)}
    />
  )}
  {mode === CREATE && <Form 
    interviewers={props.interviewers}
     onCancel={() => back()} 
     onSave={(name, interviewer) => save(name, interviewer) }
     
     />}

  {mode === SAVING && <Status message={"Saving"}/>}
  {mode === DELETING && <Status message={"Deleting"}/>}
  {mode === CONFIRM && <Confirm 
    message={"You sure, boss?"}
    onConfirm={() => actualErase(props.id)}
    onCancel={() => back()}

    />}

  {mode === EDIT && <Form 
    interviewers={props.interviewers}
     onCancel={() => back()} 
     onSave={(name, interviewer) => save(name, interviewer) }
     name={props.interview.student}
     interviewer={props.interview.interviewer.id}

    />}
  
  {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />} */}

  </article>
}