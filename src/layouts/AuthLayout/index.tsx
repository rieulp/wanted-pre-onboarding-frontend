import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

interface IAuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: IAuthLayoutProps) => {
  return (
    <div className={styles.Layout_container}>
      <header className={styles.header}>
        <div className={styles.name}>
          <Link to="/login">My Todo</Link>
        </div>
      </header>
      <div className={styles.main}>{children}</div>
    </div>
  );
};

export default AuthLayout;
