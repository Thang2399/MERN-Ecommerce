import { useNavigate } from 'react-router-dom';

export default function Logo(): JSX.Element {
    const navigate = useNavigate();

    const handleBackToMainPage = () => {
        navigate('/');
    };

    return (
        <div className={'text-white text-3xl font-semibold cursor-pointer font-logo'} onClick={handleBackToMainPage}>
            The Fake Shop
        </div>
    );
}