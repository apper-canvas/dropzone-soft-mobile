import { useNavigate } from 'react-router-dom';
import NotFoundDisplay from '@/components/organisms/NotFoundDisplay';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/home');
  };

  return (
    <NotFoundDisplay onGoHome={handleGoHome} />
  );
};

export default NotFoundPage;