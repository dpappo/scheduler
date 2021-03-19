import React, {Fragment} from "react";
import "./styles.scss";
import Header from './Header'
import Show from './Show'
import Empty from './Empty'
import useVisualMode from "../../hooks/useVisualMode"
import Form from './Form'
import Status from './Status'

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

export default function Appointment(props) {
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

const {bookInterview} = props;

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING)
    setTimeout(() => {
    bookInterview(props.id, interview)
      .then(transition(SHOW))
      
    }, 1000);
    
  }

  return <article className="appointment">
  <Header time={props.time} />

  {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
  {mode === SHOW && (
    <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
    />
  )}
  {mode === CREATE && <Form 
    interviewers={props.interviewers}
     onCancel={() => back()} 
     onSave={(name, interviewer) => save(name, interviewer) }
     
     />}

  {mode === SAVING && <Status/>}
  
  {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />} */}

  </article>
}