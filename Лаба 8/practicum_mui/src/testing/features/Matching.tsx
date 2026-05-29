import { Grid, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import {tTasks} from "../quizData"
import {useEffect, useMemo} from "react";
import SortableList from "./SortableList";
import {useDispatch} from "react-redux";
import {addList} from "./quizSlice";

interface ComponentProps {
    index: number,
    tasks: tTasks;
}

function Matching({index, tasks}: ComponentProps) {

    const dispatch = useDispatch();
    const answers = useMemo(() => {
        return tasks
            .map(item => item.answer)
            .sort(() => Math.random() - 0.5);
    }, [tasks]);

    useEffect(() => {
        dispatch(addList({ index, items: answers }));
    }, [dispatch, index, answers]);

    return (
        <Grid container spacing={2}>
            <Grid size={6}>
                <List>
                    {tasks.map((item, index) => (
                        <ListItem key={index}>
                            <ListItemButton
                                sx={{
                                    border: '1px solid gray',
                                    borderRadius: '5px',
                                    textAlign: 'right',
                                }}>
                                <ListItemText primary={item.question} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Grid>

            <Grid size={6}>
                <SortableList answers={answers} index={index} />
            </Grid>
        </Grid>
    );
}

export default Matching