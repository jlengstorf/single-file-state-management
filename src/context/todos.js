import React, { createContext, useReducer, useContext } from 'react';

const reducer = (todos, action) => {
  switch (action.type) {
    case 'add':
      return todos.concat({
        id: Date.now(),
        completed: false,
        text: action.text
      });

    case 'delete':
      return todos.filter(todo => todo.id !== action.id);

    case 'toggle':
      return todos.map(todo =>
        todo.id === action.id
          ? {
              ...todo,
              completed: !todo.completed
            }
          : todo
      );

    default:
      console.error(`unknown action ${action.type}`);
      return todos;
  }
};

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => (
  <TodoContext.Provider value={useReducer(reducer, [])}>
    {children}
  </TodoContext.Provider>
);

export const useTodos = () => {
  const [todos, dispatch] = useContext(TodoContext);

  const addTodo = text => dispatch({ type: 'add', text });
  const toggleTodo = id => dispatch({ type: 'toggle', id });
  const deleteTodo = id => dispatch({ type: 'delete', id });

  return { todos, addTodo, toggleTodo, deleteTodo };
};
