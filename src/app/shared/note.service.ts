import {Injectable} from "@angular/core";
import {FbCreateResponse, Note, Post} from "./interfaces";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class NoteService {
  constructor(private http: HttpClient) {}

  create(note: Note): Observable<Note> {
    return this.http.post<any>(`${environment.fbDbUrl}/note.json`, note)
      .pipe(map((response: FbCreateResponse) => {
        return {
          ...note,
          id: response.name,
          date: new Date(note.date)
        }
      }))
  }

  //получение всех постов, которые есть в базе
  getAll(): Observable<Note[]> {
    return this.http.get(`${environment.fbDbUrl}/note.json`) //получение данных с сервера
      //распарсить их
      .pipe(map((response:{[key: string]: any}) => {
        return Object
          .keys(response) //пробежаться по объекту response, получим массив айдишников
          //преобразование в другой объект
          .map(key => ({
            ...response[key],
            id: key,
            date: new Date(response[key].date)
          }))
      }))
  }

}
