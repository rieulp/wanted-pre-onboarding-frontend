import React, { useMemo } from 'react';
import styles from './styles.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
  size?: 'small' | 'midium' | 'large';
  fullWidth?: boolean;
  className?: string;
}
const Button = ({ children, onClick, disabled, type, fullWidth, className, size }: ButtonProps) => {
  const classNames = useMemo(() => {
    const classes = ['Button'];
    if (size) classes.push(size);
    if (fullWidth) classes.push('full_width');
    return classes.map((name) => styles[name]).join(' ') + (className ? ' ' + className : '');
  }, [className, fullWidth, size]);

  return (
    <button className={classNames} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: 'button',
  size: 'midium',
};

export default Button;
