import { useState, useEffect, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { requestGetTodos, requestCreateTodo } from './../../api/todo';
import { getLoginState } from '../../api/auth';
import MainLayout from '../../layouts/MainLayout';
import TodoItem from '../../components/TodoItem';
import Input from '../../components/Input';
import styles from './styles.module.scss';
import useInput from '../../hooks/useInput';
import Button from '../../components/Button';
import type { ITodoResponse } from './../../api/todo';

function Todo() {
  const isLoggedIn = getLoginState();
  const [newTodo, setNewTodo, onChangeNewTodo] = useInput('');
  const [todos, setTodos] = useState<ITodoResponse[]>([]);
  const [requireUpdate, setRequireUpdate] = useState(true);

  const createNewTodo = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!newTodo.trim()) return;
      requestCreateTodo(newTodo.trim()).then(() => setRequireUpdate(true));
      setNewTodo('');
    },
    [newTodo, setNewTodo]
  );

  useEffect(() => {
    const getTodos = async () => {
      const todos = await requestGetTodos();
      if (todos) setTodos(todos);
    };

    if (requireUpdate) {
      getTodos();
      setRequireUpdate(false);
    }
  }, [requireUpdate]);

  if (!isLoggedIn) return <Navigate to="/" replace />;

  return (
    <MainLayout>
      <form className={styles.Todo_buttons}>
        <Input className={styles.newTodo_input} label="새로운 할일" onChange={onChangeNewTodo} value={newTodo} fullWidth type="text" />
        <Button type="submit" onClick={createNewTodo} size="midium">
          추가
        </Button>
      </form>
      <ul className={styles.TodoList}>
        {todos.map((props) => (
          <TodoItem {...props} key={props.id} onUpdate={() => setRequireUpdate(true)} />
        ))}
      </ul>
    </MainLayout>
  );
}

export default Todo;
