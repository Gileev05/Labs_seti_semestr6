import { useEffect, useMemo, useRef } from "react";
import { useDispatch } from "react-redux";
import { QuizTask } from "../quizData";
import SortableList from "./SortableList";
import { setList } from "./quizSlice";
import { Box } from "@mui/material";

interface ComponentProps {
    index: number;
    tasks: QuizTask[];
}

function Sorting({ index, tasks }: ComponentProps) {
    const dispatch = useDispatch();
    const initialized = useRef(false);

    const answers = useMemo(() => {
        return tasks.map(item => item.answer as string).sort(() => Math.random() - 0.5);
    }, [tasks]);

    useEffect(() => {
        if (!initialized.current) {
            dispatch(setList({ index, items: answers }));
            initialized.current = true;
        }
    }, [dispatch, index, answers]);

    return (
        <Box sx={{ maxWidth: 400, margin: '0 auto' }}>
            <SortableList index={index} answers={answers} />
        </Box>
    );
}

export default Sorting;