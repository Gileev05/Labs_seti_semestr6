import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ListsState {
    lists: any[][];
    choices: {
        [key: number]: boolean[];
    };
}

const initialState: ListsState = {
    lists: [],
    choices: {},
};

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        setList: (state, action: PayloadAction<{ index: number; items: any[] }>) => {
            state.lists[action.payload.index] = action.payload.items;
        },
        setChoice: (state, action: PayloadAction<{ index: number; choice: boolean[] }>) => {
            state.choices[action.payload.index] = action.payload.choice;
        },
        resetQuiz: (state) => {
            state.lists = [];
            state.choices = {};
        },
    },
});

export const { setList, setChoice, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;