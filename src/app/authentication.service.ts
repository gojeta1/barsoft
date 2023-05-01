import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { Token } from '@angular/compiler';
import { Route } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  //private apiUrl = 'assets/users.json';
  private apiUrl = 'http://localhost:3000/login';
  private tokenKey = 'my-app-token';

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService){ }

  login(username: string, password: string): Observable<{token: string}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const data = { username: username, password: password };
    return this.http.post<any>(this.apiUrl, data, {headers})
      .pipe(
        tap(response => {
         localStorage.setItem(this.tokenKey, response.token);
        })
      );
  }

  logout() : void {
    localStorage.removeItem(this.tokenKey);
  }
      getToken() {
        return localStorage.getItem(this.tokenKey);

      }
    
      isAuthenticated(): boolean {
        const token = this.getToken();
        return token != null;
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
}