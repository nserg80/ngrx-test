import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { AuthResponceInterface } from '../types/authResponce.interface';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { LoginRequestInterface } from '../types/loginRequest.interface';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  getUser(responce: AuthResponceInterface): CurrentUserInterface {
    return responce.user
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users'
    return this.http.post<AuthResponceInterface>(url, data).pipe(
      map(this.getUser)
    )
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users/login'
    return this.http.post<AuthResponceInterface>(url, data).pipe(
      map(this.getUser)
    )
  }

  getCurrentUser(): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/user'
    return this.http.get<AuthResponceInterface>(url).pipe(
      map(this.getUser)
    )
  }
}
