import { Box, Button, Container, Typography, Paper } from '@mui/material';
import { quizData } from "../quizData";
import Matching from "./Matching";
import Sorting from "./Sorting";
import Choice from "./Choice";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { resetQuiz } from "./quizSlice";

function Quiz() {
    const [results, setResults] = useState<{ correct: number, total: number, isFullyCorrect: boolean }[] | null>(null);
    const dispatch = useDispatch();
    const reduxLists = useSelector((state: RootState) => state.lists.lists);
    const reduxChoices = useSelector((state: RootState) => state.lists.choices);

    const handleCheck = () => {
        const scorePerQuiz = quizData.map((quizItem, quizIndex) => {
            let correctCount = 0;

            if (quizItem.type === 'M' || quizItem.type === 'S') {
                const total = quizItem.tasks?.length || 0;
                const userAnswers = reduxLists[quizIndex];

                quizItem.tasks?.forEach((task, taskIndex) => {
                    if (userAnswers?.[taskIndex] === task.answer) correctCount++;
                });

                const isFullyCorrect = correctCount === total;
                return { correct: correctCount, total, isFullyCorrect };
            }

            if (quizItem.type === 'SC' || quizItem.type === 'MC') {
                const total = quizItem.tasks.length;
                const userAnswers = reduxChoices[quizIndex];

                quizItem.tasks.forEach((task, taskIndex) => {
                    if (userAnswers?.[taskIndex] === task.answer) correctCount++;
                });

                const isFullyCorrect = correctCount === total;
                return { correct: correctCount, total, isFullyCorrect };
            }

            return { correct: 0, total: 0, isFullyCorrect: false };
        });

        setResults(scorePerQuiz);
    };

    const handleReset = () => {
        setResults(null);
        dispatch(resetQuiz());
    };

    const fullyCorrectCount = results?.filter(res => res.isFullyCorrect).length || 0;
    const totalQuizzes = quizData.length;

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
            {quizData.map((item, index) => (
                <Paper key={item.id} elevation={3} sx={{ mb: 4, p: 3 }}>
                    <Typography variant="h6" gutterBottom color="primary">
                        {index + 1}. {item.title}
                    </Typography>

                    <Box sx={{ mt: 2 }}>
                        {item.type === 'M' && <Matching index={index} tasks={item.tasks} />}
                        {item.type === 'S' && <Sorting index={index} tasks={item.tasks} />}
                        {(item.type === 'SC' || item.type === 'MC') && (
                            <Choice
                                index={index}
                                type={item.type}
                                tasks={item.tasks}
                            />
                        )}
                    </Box>
                </Paper>
            ))}

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
                <Button variant="contained" size="large" onClick={handleCheck}>
                    Проверить
                </Button>
                <Button variant="outlined" size="large" onClick={handleReset}>
                    Начать снова
                </Button>
            </Box>

            {results !== null && (
                <Paper elevation={3} sx={{ mt: 4, p: 3, bgcolor: '#f5f5f5' }}>
                    <Typography variant="h5" gutterBottom color="secondary">
                        Результаты тестирования
                    </Typography>
                    {results.map((res, idx) => (
                        <Typography key={idx} variant="body1" sx={{ mt: 1 }}>
                            Задание {idx + 1}: верно {res.correct} из {res.total}
                        </Typography>
                    ))}
                    <Typography variant="h6" sx={{ mt: 2, pt: 2, borderTop: '1px solid #ccc' }}>
                        Итого баллов: {results.reduce((acc, curr) => acc + curr.correct, 0)} из {results.reduce((acc, curr) => acc + curr.total, 0)}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        Правильно решённых заданий: {fullyCorrectCount} из {totalQuizzes}
                    </Typography>
                </Paper>
            )}
        </Container>
    );
}

export default Quiz;