export type QuizTask = {
    question?: string;
    answer: string | string[] | boolean;
    options?: string;
};

export type tQuiz = {
    id: number;
    type: "M" | "S" | "SC" | "MC";
    title: string;
    tasks: QuizTask[];
};

export const quizData: tQuiz[] = [
    {
        id: 1,
        type: "M",
        title: "Сопоставьте фильм и его краткое описание",
        tasks: [
            { question: "Ирония судьбы", answer: "Культовая новогодняя комедия" },
            { question: "Москва слезам не верит", answer: "Оскароносная драма" },
            { question: "Служебный роман", answer: "Комедия о строгой начальнице" },
            { question: "Неуловимые мстители", answer: "Приключенческий фильм о подростках" }
        ]
    },
    {
        id: 2,
        type: "M",
        title: "Сопоставьте актера/персонажа и фильм",
        tasks: [
            { question: "Женя Лукашин", answer: "Ирония судьбы" },
            { question: "Семён Семёныч", answer: "Бриллиантовая рука" },
            { question: "Алиса Фрейндлих", answer: "Служебный роман" }
        ]
    },
    {
        id: 3,
        type: "S",
        title: "Расположите события фильма «Ирония судьбы» в хронологическом порядке",
        tasks: [
            { answer: "Поход в баню с друзьями" },
            { answer: "Случайный перелет в Ленинград" },
            { answer: "Встреча с Надей Шевелевой" },
            { answer: "Возвращение в Москву" }
        ]
    },
    {
        id: 4,
        type: "SC",
        title: "Отметьте, какие фильмы получили премию «Оскар»",
        tasks: [
            { question: "Ирония судьбы", answer: false },
            { question: "Бриллиантовая рука", answer: false },
            { question: "Москва слезам не верит", answer: true },
            { question: "Служебный роман", answer: false }
        ]
    },
    {
        id: 5,
        type: "MC",
        title: "Отметьте всех актеров, снимавшихся в фильме «Бриллиантовая рука»",
        tasks: [
            { question: "Юрий Никулин", answer: true },
            { question: "Андрей Миронов", answer: true },
            { question: "Алиса Фрейндлих", answer: false },
            { question: "Анатолий Папанов", answer: true }
        ]
    }
];