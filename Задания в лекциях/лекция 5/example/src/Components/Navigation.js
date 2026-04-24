import { useNavigate } from 'react-router-dom';

export const Navigation = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div>
                <button
                    onClick={() => navigate('/one')}
                    style={{ margin: '5px', padding: '5px 10px' }}
                >
                    На страницу 1
                </button>
                <button
                    onClick={() => navigate('/two')}
                    style={{ margin: '5px', padding: '5px 10px' }}
                >
                    На страницу 2
                </button>
                <button
                    onClick={() => navigate(-1)}
                    style={{ margin: '5px', padding: '5px 10px' }}
                >
                    Назад
                </button>
                <button
                    onClick={() => navigate(1)}
                    style={{ margin: '5px', padding: '5px 10px' }}
                >
                    Вперёд
                </button>
            </div>
        </div>
    );
};