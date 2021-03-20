import React, {Fragment} from "react";
import "./styles.scss";
import Header from './Header'
import Show from './Show'
import Empty from './Empty'
import useVisualMode from "../../hooks/useVisualMode"
import Form from './Form'
import Status from './Status'
import Confirm from './Confirm'
import Error from './Error'

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const DELETING = "DELETING";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

const {bookInterview, cancelInterview, editInterview} = props;

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING)
    bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true))
      
    
  }

  function edit(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING)
    editInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true))
      
    
  }

  function erase(id) {

    transition(CONFIRM)
    
  }

  function actualErase(id) {

    transition(DELETING, true)
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true))

    
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
  {mode === ERROR_DELETE && <Error message={"Error Deleting"}/>}
  {mode === ERROR_SAVE && <Error message={"Error Saving"}/>}
  {mode === CONFIRM && <Confirm 
    message={"You sure, boss?"}
    onConfirm={() => actualErase(props.id)}
    onCancel={() => back()}

    />}

  {mode === EDIT && <Form 
    interviewers={props.interviewers}
     onCancel={() => back()} 
     onSave={(name, interviewer) => edit(name, interviewer) }
     name={props.interview.student}
     interviewer={props.interview.interviewer.id}

    />}
  
  {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />} */}

  </article>
}