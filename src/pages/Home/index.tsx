import { Navigate } from 'react-router-dom';
import { getLoginState } from '../../api/auth';

function Home() {
  const isLoggedIn = getLoginState();

  if (isLoggedIn) return <Navigate to="/todo" replace />;
  return <Navigate to="/login" replace />;
}

export default Home;
