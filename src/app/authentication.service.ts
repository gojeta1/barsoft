import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { Token } from '@angular/compiler';
import { Route } from '@angular/router';
import { jwtOptionsFactory } from './app.module';
import { LoginComponent } from './login/login.component';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }
  

  login(username: string, password: string): Observable<LoginResponse> {
    const body = { username, password };

    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, body);
  }

}
      
    //  return this.http.get<{users: any []}>(`${this.apiUrl}/login`).pipe(
      //  map(result => { 
      //    const user = result.users.find(u => u.username === username && u.password === password);
      //    if (user){
      //      return user !== undefined;
      //    }else{
     //       throw new Error('Usuário ou senha Incorretos');
      //    }
          
   // })
   // );
