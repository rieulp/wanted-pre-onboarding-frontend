import { useCallback, useState, useEffect, useRef } from 'react';
import { requestDeleteTodo, requestUpdateTodo } from '../../api/todo';
import { CgCloseO, CgPen } from 'react-icons/cg';
import styles from './styles.module.scss';
import useInput from '../../hooks/useInput';

interface ITodoItemProps {
  id: number;
  todo: string;
  isCompleted: boolean;
  onUpdate: () => void;
}

const TodoItem = ({ id, todo, isCompleted, onUpdate }: ITodoItemProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [completed, setCompleted] = useState(isCompleted);
  const [edit, setEdit] = useState(false);
  const [todoText, , onChangeTodoText] = useInput(todo);
  const [requireUpdate, setRequireUpdate] = useState(false);

  const deleteTodo = useCallback(() => {
    requestDeleteTodo(id).then(() => onUpdate());
  }, [id, onUpdate]);

  const updateTodo = useCallback(() => {
    requestUpdateTodo(id, todoText, completed).then(() => onUpdate && onUpdate());
  }, [todoText, completed, onUpdate, id]);

  useEffect(() => {
    if (requireUpdate) {
      updateTodo();
      setRequireUpdate(false);
    }
  }, [requireUpdate, updateTodo]);

  useEffect(() => {
    if (edit) inputRef.current?.focus();
  }, [edit]);

  return (
    <div className={`${styles.Todo_wrapper} ${completed ? styles.done : ''}`}>
      <div className={styles.Checkbox}>
        <input
          id={`completedCheck${id}`}
          type="checkbox"
          onChange={() => {
            setCompleted((value) => !value);
            setRequireUpdate(true);
          }}
          checked={completed}
        />
        <label htmlFor={`completedCheck${id}`} className={styles.checkButton}></label>
      </div>
      <div className={styles.Todo_content}>
        {edit ? (
          <input
            onKeyDown={(e) => {
              if (e.code === 'Enter') {
                if (todo !== todoText) setRequireUpdate(true);
                setEdit(false);
              }
            }}
            value={todoText}
            disabled={!edit}
            onChange={onChangeTodoText}
            ref={inputRef}
          />
        ) : (
          <p>{todoText}</p>
        )}
      </div>
      {edit ? (
        <>
          <button
            className={[styles.Button, styles.ok].join(' ')}
            onClick={() => {
              if (todo !== todoText) setRequireUpdate(true);
              setEdit(false);
            }}
          >
            제출
          </button>
          <button className={[styles.Button, styles.cancel].join(' ')} onClick={() => setEdit(false)}>
            취소
          </button>
        </>
      ) : (
        <>
          <CgPen className={[styles.Button, styles.edit].join(' ')} onClick={() => setEdit(true)} />
          <CgCloseO className={[styles.Button, styles.close].join(' ')} onClick={deleteTodo} />
        </>
      )}
    </div>
  );
};

export default TodoItem;
