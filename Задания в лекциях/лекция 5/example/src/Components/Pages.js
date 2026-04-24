import {Navigation} from './Navigation'

const BuildPage = (index, text) => (
    <>
        <Navigation />
        <h3>Страница {index}</h3>
        <div>
            Страница {index}. { text }
        </div>
    </>
);

export const PageOne = () => BuildPage(1, "текст 1");
export const PageTwo = () => BuildPage(2, "текст 2");