import { createSlice } from "@reduxjs/toolkit";
import { QUESTIONS } from "../data/questions";

const initialState = {
    currentTest: null,
    currentQuestionIndex: 0,
    answers: [],
    progress: {},
    correct: 0, // Added for clarity
    explanation : '',
};

const questionSlice = createSlice({
    name: 'question',
    initialState,

    reducers: {
        //to set the current test
        setCurrentTest: (state, action) => {
            state.currentTest = QUESTIONS.find(test => Number(test.test) === Number(action.payload));
            state.currentQuestionIndex = 0;
            state.answers = [];  
            state.correct = 0;
        },
        answerQuestions: (state, action) => {
           
                //push te answers in answer array
                state.answers.push(action.payload);

                //store explanation for current question
                const currentQuestion = state.currentTest.questions[state.currentQuestionIndex];
                if (currentQuestion && currentQuestion.explanation) {
                    state.explanation = currentQuestion.explanation;
                } else {
                    state.explanation = '';
                }
          
        },

        goToNextQuestion: (state) => {
        if (
            state.currentTest &&
            state.currentQuestionIndex < state.currentTest.questions.length - 1
            ) {
                state.currentQuestionIndex += 1;
                state.explanation = ''; // Reset explanation when moving to next question
            }
        },

        finishTest: (state) => {
            if (!state.currentTest || !state.currentTest.questions) return;

            //store the correct answers on the variable
            const correct = state.currentTest.questions.filter(
                (q, i) => q.answer === state.answers[i] 
            ).length;

            state.correct = correct;

            //for find out the score of each test
            const score = (correct / state.currentTest.questions.length) * 100;

            //for set the progress of each test
           const testKey = `Test-${Number(state.currentTest.test)}`;

              if (!state.progress[testKey]) {
                state.progress[testKey] = {
                    attempts: 1,
                    scores: [score],   
                    latestScore: score
                };
            } else {
                state.progress[testKey].attempts += 1;
                state.progress[testKey].scores.push(score);  
                state.progress[testKey].latestScore = score;
            }
        },
        
        //to reset the test
        resetTest: (state) => {
            state.currentTest = null;
            state.currentQuestionIndex = 0;
            state.answers = [];
            state.correct = 0;
           state.explanation = '';
        },
    },
});

export const { setCurrentTest, answerQuestions,goToNextQuestion, finishTest, resetTest , progress } = questionSlice.actions;
export default questionSlice.reducer;