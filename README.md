# Interview Scheduler
## Project Description

Interview Scheduler is a React SPA (Single Page Application) for tracking students interviews built with the latest tools and techniques for optimized user experience.

The App utilizes React built-in and custom hooks and allows users to add, edit and delete appointments in real time, with a focus on useState.

Data is persisted by a separate API server using a PostgreSQL database. The client application communicates with an API server over HTTP, using the JSON format.

This project features a variety of unit, component, integration, and end-to-end tests to assure that various states and functions work appropriately.

## Project Features
- Appointment days (Monday to Friday) are displayed and colour-coordinated depending on availability
- The days show the number of slots available as a snapshot of the week
- A user can switch between days and see live and detailed information without reload
- Booked and available slots are clearly differentiated
- A user can book interviews by typing in a student name and clicking on an interviewer from a list of interviewers
- A user cannot erroneously schedule an interview; name and interview are required for save
- A user can change the details of an existing interview by pressing the edit icon
- A user can cancel an existing interview, a pop-up message will ask to confirm the action before permanently deleting an interview
- Days display currently remaining spots and capture updates after each modification


### Scheduling Flow
!['_Showing error handling for invalid form, scheduling, editing, and deleting appointments_'](/images/schedule_flow.gif)
_Showing error handling for invalid form, scheduling, editing, and deleting appointments_

### Daily view
!['booked-slots-available'](/images/booked-slots-available.png)
_By selecting a weekday on the left panel, a user can see booked appointments and available slots for each day._


### New appointment booking
!['book-new-apt'](/images/book-new-apt.png)
_A user can add interviews to available slots by typing a student name and adding interviewer from the list (an error message will be shown if a student name field is left blank)._



## Installation
```
npm install
```

## Running Webpack Development Server
```
npm start
```

## Running Jest Test Framework
```
npm test
```

## Running Storybook Visual Testbed
```
npm run storybook
```

## API server/*Database Setup

For full functionality both must run concurrently: the client and the API server applications.
- Start by forking and cloning the scheduler-api server [here](https://github.com/lighthouse-labs/scheduler-api)
- Follow the steps outlined in README to install and setup the database
- Fork and clone this repo
- Navigate to the root directory and install dependencies with `npm install`
- Once you have the database setup and the scheduler-api server running, run the following command from the root directory of the project `npm start`

## Project Stack

__Front-End:__ React, Axios, JSX, HTML, SASS, JavaScript

__Back-End:__ Express, Node.js, PostgreSQL

__Testing:__ Storybook, Webpack Dev Server, Jest, Testing Library, Cypress

## Dependencies
- Axios
- Classnames
- Normalize.css
- React
- React-dom
- React-scripts
- Babel/core
- Storybook/addon-actions
- Storybook/addon-backgrounds
- Storybook/addon-links
- Storybook/addons
- Storybook/react
- Testing-library/jest-dom
- Testing-library/react
- Testing-library/react-hooks
- Babel-loader
- Node-sass
- Prop-types
- React-test-renderer