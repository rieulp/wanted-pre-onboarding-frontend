import { useCallback, useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import Button from '../../components/Button';
import Input from '../../components/Input';
import useInput from '../../hooks/useInput';
import { getLoginState, requestLogin } from './../../api/auth';
import styles from './styles.module.scss';

function Login() {
  const isLoggedIn = getLoginState();
  const [email, setEmail, onChangeEmail] = useInput();
  const [password, setPassword, onChangePassword] = useInput();
  const [valid, setValid] = useState(false);
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!email.trim()) alert('이메일을 입력해주세요');
      else if (!password.trim()) alert('비밀번호를 입력해주세요');
      else {
        requestLogin(email, password)
          .then((value) => {
            if (value) navigate('/todo', { replace: true });
          })
          .catch((error) => alert(error.message));
      }

      setEmail('');
      setPassword('');
    },
    [email, password, setEmail, setPassword, navigate]
  );

  useEffect(() => {
    if (/@/.test(email) && password.trim().length >= 8) setValid(true);
    else setValid(false);
  }, [email, password]);

  if (isLoggedIn) return <Navigate to="/todo" replace />;

  return (
    <AuthLayout>
      <div className={styles.container}>
        <div className={styles.form_wrapper}>
          <h1 className={styles.hello}>다시 만나서 반가워요!</h1>
          <div className={styles.go_signup}>
            <span>처음 오셨나요?</span> <Link to="/signup">회원가입 하러 가기</Link>
          </div>
          <form onSubmit={onSubmit}>
            <Input className={styles.input} type="email" value={email} onChange={onChangeEmail} label="email" required />
            <Input className={styles.input} type="password" value={password} onChange={onChangePassword} label="password" required />
            <Button className={styles.button} type="submit" fullWidth size="large" disabled={!valid}>
              로그인
            </Button>
          </form>
        </div>
        <div className={styles.image_wrapper}>
          <img src="images/heart.webp" alt="red heart" />
        </div>
      </div>
    </AuthLayout>
  );
}

export default Login;
