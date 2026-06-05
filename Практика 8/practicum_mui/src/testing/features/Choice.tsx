import { FormGroup, FormControlLabel, Radio, RadioGroup, Checkbox, Box, Typography, FormControl } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { QuizTask } from "../quizData";
import { setChoice } from "./quizSlice";
import React from "react";

interface ComponentProps {
    index: number;
    type: "SC" | "MC";
    tasks: QuizTask[];
}

function Choice({ index, type, tasks }: ComponentProps) {
    const dispatch = useDispatch();
    const choices = useSelector((state: RootState) => state.lists.choices);
    const currentState = choices[index] || tasks.map(() => false);

    const handleRadioChange = (taskIndex: number) => {
        const newValues = tasks.map((_, idx) => idx === taskIndex);
        dispatch(setChoice({ index, choice: newValues }));
    };

    const handleCheckboxChange = (taskIndex: number) => {
        const newValues = [...currentState];
        newValues[taskIndex] = !newValues[taskIndex];
        dispatch(setChoice({ index, choice: newValues }));
    };

    if (type === 'SC') {
        const selectedIndex = currentState.findIndex((val: boolean) => val === true);

        return (
            <Box>
                <FormControl component="fieldset">
                    <RadioGroup
                        value={selectedIndex !== -1 ? selectedIndex.toString() : ''}
                        onChange={(e) => handleRadioChange(parseInt(e.target.value))}
                    >
                        {tasks.map((task, taskIndex) => (
                            <FormControlLabel
                                key={taskIndex}
                                value={taskIndex.toString()}
                                control={<Radio />}
                                label={task.question}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </Box>
        );
    }

    return (
        <Box>
            <FormGroup>
                {tasks.map((task, taskIndex) => (
                    <FormControlLabel
                        key={taskIndex}
                        control={
                            <Checkbox
                                checked={currentState[taskIndex]}
                                onChange={() => handleCheckboxChange(taskIndex)}
                            />
                        }
                        label={task.question}
                    />
                ))}
            </FormGroup>
        </Box>
    );
}

export default Choice;