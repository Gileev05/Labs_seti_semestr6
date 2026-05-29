import { Box, Button, Container, Typography } from '@mui/material';
import { quiz } from "../quizData";
import Matching from "./Matching";
import {useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

function Quiz() {

    const [results, setResults] = useState<number[] | null>(null);
    const [resetKey, setResetKey] = useState<number>(0);
    const reduxLists = useSelector((state: RootState) => state.lists.lists);

    const handleCheck = () => {
        const scorePerQuiz = quiz.map((quizItem, quizIndex) => {
            const userAnswers = reduxLists[quizIndex] || [];
            let correctCount = 0;

            quizItem.tasks.forEach((task, taskIndex) => {
                if (userAnswers[taskIndex] === task.answer) {
                    correctCount++;
                }
            });

            return correctCount;
        });

        setResults(scorePerQuiz);
    };

    const handleReset = () => {
        setResults(null);
        setResetKey(prev => prev + 1);
    };

    return (
        <Container maxWidth="md">
            {quiz.map((item, index) => (
                <Box key={`${item.id}-${resetKey}`} component="section" sx={{ m: 2, p:2 }}>
                    <Typography variant="h5" gutterBottom>
                        {index + 1}. { item.title }
                    </Typography>
                    <Matching index={index} tasks={ item.tasks }/>
                </Box>
            ))}
            <Box sx={{ display: 'flex', justifyContent:'space-around' }}>
                <Button variant="contained" onClick={handleCheck}>Проверить</Button>
                <Button variant="contained" onClick={handleReset}>Начать снова</Button>
            </Box>

            {results !== null && (
                <Box sx={{ mt: 3, p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Результаты тестирования
                    </Typography>
                    {results.map((score, idx) => (
                        <Typography key={idx} variant="body1">
                            Задание {idx + 1}: верно ответов {score} из {quiz[idx].tasks.length}
                        </Typography>
                    ))}
                </Box>
            )}
        </Container>
    );
}

export default Quiz