import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { Observable, TimeoutError, of } from 'rxjs';
import { Token } from '@angular/compiler';
import { Route, Router } from '@angular/router';
import { jwtOptionsFactory } from './app.module';
import { LoginComponent } from './login/login.component';
import { NotificationService } from './notification.service';

interface LoginResponse {
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = 'http://localhost:3000';
 
  
  isLoggedin = false;
  aguardandoResposta = true;
  carregando = true;
  private isAuthenticated = false;
  nomeUser = '';

  constructor(private http: HttpClient, private router: Router, private notificationService: NotificationService) { }
  

  login(username: string, password: string): void{

     this.http.post<any>(`${this.apiUrl}/login`, {username, password}).subscribe(
      (response) => {
        console.log(response.message);

        // Faça o que for necessário após o login bem-sucedido
        if(response.success === true){
          this.nomeUser = response.nomeUsuario;
          this.router.navigate(['/home'])
          this.isAuthenticated = true;
          return;
          }
      },
      (error) => {
        console.error('Erro ao fazer login:', error);
        this.notificationService.notify(error.error.message);
        // Lide com o erro de login
      }
    );
    
  }

  getNomeUser(){
    return this.nomeUser;
  }

  logout(): void {
    // Lógica de logout
    // Realize as ações necessárias para deslogar o usuário, como limpar o token de autenticação, remover informações da sessão, etc.

    this.isAuthenticated = false;
  }

  isAuthenticatedUser(): boolean {
    // Verifique se o usuário está autenticado
    return this.isAuthenticated;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  
}

