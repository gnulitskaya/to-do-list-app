export interface FbAuthResponse {
  idToken: string
  expiresIn: string
}

export interface Post {
  id?: string
  text: string
  date: Date
  completed: boolean
}

export interface Note {
  id: number,
  title: string,
  checked: boolean
}

//фабричная функция, отвечающая за создания объекта
export function createNote({id, title}: Note) {
  return {
    id,
    title,
    checked: false
  } as Note
}


export interface FbCreateResponse {
  name: string
}
