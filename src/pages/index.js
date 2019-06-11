import React, { useState } from 'react';
import { TodoProvider, useTodos } from '../context/todos';

const AddTodo = () => {
  const [text, setText] = useState('');
  const { addTodo } = useTodos();

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        addTodo(text);
        setText('');
      }}
    >
      <label htmlFor="add-todo">Add a new todo</label>
      <input
        id="add-todo"
        onChange={e => setText(e.target.value)}
        value={text}
      />
      <button type="submit">Add</button>
    </form>
  );
};

const Todos = () => {
  const { todos, toggleTodo, deleteTodo } = useTodos();

  return todos.map(todo => (
    <p key={todo.id}>
      <input
        type="checkbox"
        checked={todo.completed}
        id={`todo-${todo.id}`}
        onChange={() => toggleTodo(todo.id)}
      />
      <label htmlFor={`todo-${todo.id}`}>{todo.text}</label>
      <button onClick={() => deleteTodo(todo.id)}>delete</button>
    </p>
  ));
};

export default () => (
  <TodoProvider>
    <h1>My Todo App</h1>
    <AddTodo />
    <Todos />
  </TodoProvider>
);
