import { Todo, NewTodo } from '../types';

const API_URL = 'http://localhost:5000/api';

export const fetchTodos = async (): Promise<Todo[]> => {
  try {
    const response = await fetch(`${API_URL}/todos`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

export const addTodo = async (todo: NewTodo): Promise<Todo> => {
  try {
    const response = await fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    
    if (!response.ok) {
      throw new Error('Failed to add todo');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
};

export const updateTodoStatus = async (id: string, completed: boolean): Promise<Todo> => {
  try {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update todo status');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating todo status:', error);
    throw error;
  }
};

export const deleteTodo = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};