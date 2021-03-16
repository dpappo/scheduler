import React, {useState} from 'react';
import "./styles.scss";
import InterviewerList from '../InterviewerList';
import Button from '../Button';

export default function Form(props){
  
  const [val, setVal] = useState("");
  const handleValChange = (e) => {
    return setVal(e.target.value) 
  }
  
  return(<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off">
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
       interviewer={props.interviewer}     
       />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button onClick={props.onCancel} danger>Cancel</Button>
      <Button onClick={props.onSave} confirm>Save</Button>
    </section>
  </section>
</main>)
}