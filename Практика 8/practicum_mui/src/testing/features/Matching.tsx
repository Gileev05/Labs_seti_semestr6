import { Grid, List as MUIList, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { QuizTask } from "../quizData";
import { useEffect, useMemo, useRef } from "react";
import SortableList from "./SortableList";
import { useDispatch } from "react-redux";
import { setList } from "./quizSlice";

interface ComponentProps {
    index: number;
    tasks: QuizTask[];
}

function Matching({ index, tasks }: ComponentProps) {
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
        <Grid container spacing={2}>
            <Grid>
                <MUIList>
                    {tasks.map((item, i) => (
                        <ListItem key={i}>
                            <ListItemButton sx={{ border: '1px solid gray', borderRadius: '5px', textAlign: 'right' }}>
                                <ListItemText primary={item.question} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </MUIList>
            </Grid>
            <Grid>
                <SortableList index={index} answers={answers} />
            </Grid>
        </Grid>
    );
}

export default Matching;