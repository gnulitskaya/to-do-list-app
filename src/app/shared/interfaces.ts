export interface FbAuthResponse {
  idToken: string
  expiresIn: string
}

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export function createTodo({ id, title }: Partial<Todo>) {
  return {
    id,
    title,
    completed: false
  } as Todo;
}
