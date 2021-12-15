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

export interface FbCreateResponse {
  name: string
}