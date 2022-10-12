import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getLoginState, requestLogout } from '../../api/auth';
import Button from '../../components/Button';
import styles from './styles.module.scss';

interface IMainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout = ({ children }: IMainLayoutProps) => {
  const naviage = useNavigate();

  const logout = useCallback(() => {
    requestLogout();
    if (!getLoginState()) naviage('/');
  }, [naviage]);

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.wrapper}>
          <div className={styles.name}>
            <Link to="/todo">My Todo</Link>
          </div>
          <div>
            <Button onClick={logout}>로그아웃</Button>
          </div>
        </div>
      </header>
      <div className={styles.main}>{children}</div>
    </div>
  );
};

export default MainLayout;
