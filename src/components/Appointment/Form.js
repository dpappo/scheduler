import React, {useState} from 'react';
import "./styles.scss";
import InterviewerList from '../InterviewerList';
import Button from '../Button';

export default function Form(props){
  
  const [val, setVal] = useState(props.name || "");
  const handleValChange = (e) => {
    return setVal(e.target.value) 
  }

  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = (e) => {
    setVal("");
    setInterviewer(null)
  }
  const cancel = (e) => {
    reset();
    props.onCancel()
  }
  
  
  return(<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off"
      onSubmit={event => event.preventDefault()}>
      <input
        value={val}
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        onChange={handleValChange}
        /*
          This must be a controlled component
        */
      />
    </form>
    <InterviewerList 
       interviewers={props.interviewers}     
       interviewer={interviewer}
       setInterviewer={setInterviewer}     
       />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button onClick={cancel} danger>Cancel</Button>
      <Button onClick={props.onSave} confirm>Save</Button>
    </section>
  </section>
</main>)
}