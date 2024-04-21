import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserData} from '../models/UserData';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/userData';

  constructor(private http: HttpClient) {
  }

  submitUserData(userData: UserData): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/submit`, userData);
  }

  getUserData(userId: number): Observable<UserData> {
    return this.http.get<UserData>(`${this.apiUrl}/${userId}`);
  }
}
