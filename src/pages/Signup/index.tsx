import { useCallback, useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { getLoginState, requestSignup } from './../../api/auth';
import useInput from '../../hooks/useInput';
import AuthLayout from '../../layouts/AuthLayout';
import Input from '../../components/Input';
import Button from '../../components/Button';
import styles from './../Login/styles.module.scss';

function Signup() {
  const isLoggedIn = getLoginState();
  const [email, setEmail, onChangeEmail] = useInput();
  const [password, setPassword, onChangePassword] = useInput();
  const navigate = useNavigate();
  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (/@/.test(email) && password.trim().length >= 8) setValid(true);
    else setValid(false);
  }, [email, password]);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!email.trim()) alert('이메일을 입력해주세요');
      else if (!password.trim()) alert('비밀번호를 입력해주세요');
      else {
        requestSignup(email, password)
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

  if (isLoggedIn) return <Navigate to="/todo" replace />;

  return (
    <AuthLayout>
      <div className={styles.container}>
        <div className={styles.form_wrapper}>
          <h1 className={styles.hello}>계정을 만들어주세요</h1>
          <div className={styles.go_signup}>
            <span>이미 계정이 있으신가요?</span> <Link to="/login">로그인 하러 가기</Link>
          </div>
          <form onSubmit={onSubmit}>
            <Input className={styles.input} type="email" value={email} onChange={onChangeEmail} label="email" />
            <Input className={styles.input} type="password" value={password} onChange={onChangePassword} label="password" />
            <Button className={styles.button} type="submit" fullWidth size="large" disabled={!valid}>
              가입하기
            </Button>
          </form>
        </div>
        <div className={styles.image_wrapper}>
          <img src="images/rocket.webp" alt="rocket" />
        </div>
      </div>
    </AuthLayout>
  );
}
export default Signup;
