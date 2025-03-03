export interface Todo {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
}

export interface NewTodo {
  title: string;
  description?: string;
}