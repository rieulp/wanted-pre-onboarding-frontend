import { useState, useMemo } from 'react';
import styles from './styles.module.scss';

interface InputProps {
  value: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  fullWidth?: boolean;
  label?: string;
  className?: string;
  required?: boolean;
}

const Input = ({ value, placeholder, type, onChange, disabled, fullWidth, required, label, className }: InputProps) => {
  const [isFocus, setFocus] = useState(false);

  const wrapperClassNames = useMemo(() => {
    const classes = ['Input_wrapper'];
    if (isFocus) classes.push('focus');
    return classes.map((name) => styles[name]).join(' ') + (className ? ' ' + className : '');
  }, [className, isFocus]);

  const inputClassNames = useMemo(() => {
    const classes = ['Input'];
    if (fullWidth) classes.push('full_width');
    return classes.map((name) => styles[name]).join(' ');
  }, [fullWidth]);

  return (
    <div className={wrapperClassNames}>
      {label && <label className={styles.Input_label}>{label}</label>}

      <input
        className={inputClassNames}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        required={required}
      />
    </div>
  );
};

Input.defaultProps = { type: 'text' };

export default Input;
