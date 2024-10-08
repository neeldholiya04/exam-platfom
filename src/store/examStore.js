
import { create } from 'zustand';

const useExamStore = create((set) => ({
  isExamStarted: false,
  isExamCompleted: false,
  isExamTerminated: false,
  violationCount: 0,
  timeRemaining: 900, 
  answers: {},
  startExam: () => set({ isExamStarted: true }),
  completeExam: () => set({ isExamCompleted: true, isExamStarted: false }),
  terminateExam: () => set({ isExamTerminated: true, isExamStarted: false }),
  incrementViolation: () => set((state) => ({ violationCount: state.violationCount + 1 })),
  setTimeRemaining: (time) => set({ timeRemaining: time }),
  decrementTime: () => set((state) => ({ timeRemaining: Math.max(0, state.timeRemaining - 1) })),
  setAnswer: (questionId, answerIndex) => set((state) => ({
    answers: { ...state.answers, [questionId]: answerIndex}
  })),
  resetExam: () => set({
    isExamStarted: false,
    isExamCompleted: false,
    isExamTerminated: false,
    violationCount: 0,
    timeRemaining: 900,
    answers: {},
  }),
}));

export default useExamStore;