import React from "react";

import { render, cleanup, queryByAltText, getByTestId, waitForElement, waitForElementToBeRemoved, fireEvent, getByText, queryByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText } from "@testing-library/react";

import Application from "components/Application";

import axios from 'axios'

afterEach(cleanup);

describe("Application", () => {
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
    
    fireEvent.click(getByText("Tuesday"));
    
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
  
  xit("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    
    fireEvent.click(getByAltText(appointment, "Add"));
    
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    fireEvent.click(getByText(appointment, "Save"));
    
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    
    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));
    //debug();

    expect(queryByText(appointment, "Saving")).not.toBeInTheDocument();
    
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
      );
            
      expect(queryByText(day, "no spots remaining")).toBeInTheDocument();
    });


    xit("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  // 1. Render the Application.
  const { container, debug } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3. Click the "Delete" button on the booked appointment.
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(queryByAltText(appointment, "Delete"));

  // 4. Check that the confirmation message is shown.
    expect(queryByText(appointment, "You sure, boss?")).toBeInTheDocument();

  // 5. Click the "Confirm" button on the confirmation.
  fireEvent.click(queryByText(appointment, "Confirm"));

  // 6. Check that the element with the text "Deleting" is displayed.
    expect(queryByText(appointment, "Deleting")).toBeInTheDocument();

  // 7. Wait until the element with the "Add" button is displayed.
  await waitForElement(() => queryByAltText(appointment, "Add"));

  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );
     
      expect(queryByText(day, "2 spots remaining")).toBeInTheDocument();
  
      });


    it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
  // 1. Render the Application.
  const { container, debug } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3. Click the "Edit" button on the booked appointment.
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(queryByAltText(appointment, "Edit"));

  // 4. Check that the form is shown.
    expect(getByTestId(appointment, "student-name-input")).toBeInTheDocument();

  //change input to different name
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });


  // 5. Click the "Save" button on the confirmation.
  fireEvent.click(queryByText(appointment, "Save"));

  // 6. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

  // 7. Wait until the element Save is removed.
    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));
    //debug();

    expect(queryByText(appointment, "Saving")).not.toBeInTheDocument();

  // 8. Check that the DayListItem with the text "Monday" also has the text "3 spots remaining".
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );
     
      expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  
      });

   it("shows the save error when failing to save an appointment", async () => {

     //fail this test
        axios.put.mockRejectedValueOnce();


    // 1. Render the Application.
  const { container, debug } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3. Click the "Edit" button on the booked appointment.
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(queryByAltText(appointment, "Edit"));

  // 4. Check that the form is shown.
    expect(getByTestId(appointment, "student-name-input")).toBeInTheDocument();

  // 5. Click the "Save" button on the confirmation.
  fireEvent.click(queryByText(appointment, "Save"));

  // 6. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

  // reject value!


  // 7. Wait until the element Save is removed.
    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));
    //debug();

// 8. Expect that the save error is shown when failing
    expect(getByText(appointment, "Error Saving")).toBeInTheDocument();

});


   it("shows the delete error when failing to delete an existing appointment", async () => {

     //fail this test
        axios.delete.mockRejectedValueOnce();


    // 1. Render the Application.
  const { container, debug } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3. Click the "Delete" button on the booked appointment.
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(queryByAltText(appointment, "Delete"));

  // 4. Check that the confirmation message is shown.
    expect(queryByText(appointment, "You sure, boss?")).toBeInTheDocument();

  // 5. Click the "Confirm" button on the confirmation.
  fireEvent.click(queryByText(appointment, "Confirm"));

  // 6. Check that the element with the text "Deleting" is displayed.
    expect(queryByText(appointment, "Deleting")).toBeInTheDocument();

  // reject value!


  // 7. Wait until the element Delete is removed.
    await waitForElementToBeRemoved(() => getByText(appointment, "Deleting"));
    //debug();

// 8. Expect that the delete error is shown when failing
    expect(getByText(appointment, "Error Deleting")).toBeInTheDocument();



});


  });
    

