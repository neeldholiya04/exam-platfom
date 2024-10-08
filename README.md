
# Exam Platform

## Overview

This is an online exam-taking platform built using **React** and **Zustand** for state management. The platform allows users to start and take a multiple-choice question (MCQ) exam within a full-screen mode, where they are monitored for violations such as attempting to exit full-screen mode. The exam is automatically terminated if violations exceed a threshold, and a timer counts down the remaining time for the exam. Upon completion, a score report is generated.

## Live Demo

Check out the live version of the platform [here](#). (Link will be updated)

### Features
- **Full-Screen Mode**: Exam must be taken in full-screen. Exiting full-screen triggers a warning or termination.
- **Violation Detection**: The platform monitors attempts to exit full-screen and terminates the exam after a second violation.
- **Countdown Timer**: A timer that counts down from 15 minutes (customizable), automatically submitting the exam once the time runs out.
- **Question Navigation**: Users can move between questions using Previous and Next buttons.
- **Dynamic Answer Saving**: Answers are saved dynamically as the user selects an option.
- **Score Calculation**: Upon exam completion, a score is calculated based on correct answers.
- **Exam Restart**: Users can restart the exam after completion or termination.

## Project Structure

```
/src
  ├── /components
  │     ├── ExamWindow.js         # Main component for the exam interface
  │     ├── Timer.js              # Timer component showing remaining time
  │     ├── ViolationWarning.js   # Component to show warning on fullscreen exit
  │     ├── Question.js           # Displays individual questions
  ├── /store
  │     └── examStore.js          # Zustand store for managing exam state
  ├── App.js                      # Main application component
  ├── index.js                    # Entry point
  ├── App.css                     # Basic styling for the app
```

## Installation

### Prerequisites
Before you begin, ensure you have the following installed on your machine:
- **Node.js** (v14.x or above)
- **npm**

### Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/neeldholiya04/exam-platform.git
   cd exam-platform
   ```

2. **Install Dependencies:**
   Install all required dependencies using npm or yarn:
   ```bash
   npm install
   ```

3. **Run the Development Server:**
   Start the development server and open the application in your browser:
   ```bash
   npm start
   ```

## Usage

1. **Starting the Exam:**
   - Upon loading, the user is presented with a welcome message and a "Start Exam" button.
   - Clicking the "Start Exam" button prompts for confirmation.
   - Upon confirmation, the exam enters full-screen mode, and the timer begins counting down from 15 minutes.

2. **Navigating Questions:**
   - Users can navigate between questions using the **Previous** and **Next** buttons.
   - Answers can be changed at any time before the exam is submitted.
   
3. **Violations:**
   - Attempting to exit full-screen mode triggers a warning for the first violation.
   - A second attempt to exit full-screen results in automatic termination of the exam.

4. **Submitting the Exam:**
   - The exam can be submitted manually by clicking the "Submit Exam" button.
   - The exam is automatically submitted if the timer reaches zero.

5. **Viewing Results:**
   - After submission or termination, the user's score is displayed along with the option to restart the exam.

## Components

### 1. **App.js**
   - The main component that manages the overall state of the exam. It contains logic to start, reset, and display the results of the exam.
   - Key functions include `handleStartExam()`, `confirmStartExam()`, and `calculateScore()`.

### 2. **ExamWindow.js**
   - This component renders the exam interface.
   - It includes the logic for full-screen mode management, violation handling, and question navigation.
   - The `handleFullScreenChange()` function detects changes in the full-screen state to trigger warnings or terminate the exam.

### 3. **Timer.js**
   - A component that shows the remaining time and auto-submits the exam when the time is up.
   - It uses `useEffect` to update the timer every second.

### 4. **ViolationWarning.js**
   - Displays a modal warning the user about a violation.
   - It is shown after the first exit from full-screen mode and prompts the user to return to full-screen.

### 5. **Question.js**
   - Renders the current question and allows the user to select an answer.
   - Calls `handleAnswer()` from `ExamWindow.js` to save the selected answer in the Zustand store.

### 6. **Zustand Store (`examStore.js`)**
   - The global state management using Zustand.
   - It manages the following:
     - `isExamStarted`, `isExamCompleted`, `isExamTerminated`
     - `violationCount`: Tracks violations.
     - `timeRemaining`: Controls the countdown timer.
     - `answers`: Stores the user's answers dynamically.

## Customization

- **Questions**: You can modify the questions in the `examQuestions` array in `ExamWindow.js`.
- **Timer**: The default time is set to 900 seconds (15 minutes). To change this, modify the `timeRemaining` value in the Zustand store (`examStore.js`).
- **Violation Threshold**: The default threshold for terminating the exam is set to 2 violations. You can change this logic in `ExamWindow.js` where the `terminateExam()` function is called after the second violation.



