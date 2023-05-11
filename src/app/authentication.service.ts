import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { Observable, TimeoutError, of } from 'rxjs';
import { Token } from '@angular/compiler';
import { Route, Router } from '@angular/router';
import { jwtOptionsFactory } from './app.module';
import { LoginComponent } from './login/login.component';

interface LoginResponse {
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = 'http://localhost:3000';
  private isLoggedin: boolean = false;
  nomeUsuario: string ='';

  constructor(private http: HttpClient, private router: Router) { }
  

  login(username: string, password: string) {
    const body = { username, password };
     return this.http.post<any>(`${this.apiUrl}/login`, body)
    .subscribe(response =>{
      if(response.success === true){
        console.log('logado')
        this.isLoggedin = true;
        this.router.navigate(['/home'])
      }
    });
  }
 
  getNomeUsuarioLogado() {
 
  }

  isLoggedIn(): boolean {
    return this.isLoggedin;
    return localStorage.getItem('token') !== null;
  }

  getToken() {
    return localStorage.getItem('token');
  }
}

