import { configureStore } from '@reduxjs/toolkit';
import quizReducer from './testing/features/quizSlice';

export const store = configureStore({
    reducer: {
        lists: quizReducer,
    },
});


export type RootState = ReturnType<typeof store.getState>;