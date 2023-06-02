import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/tabelausuarios'; // URL do seu backend

  constructor(private http: HttpClient) {}

  deleteUser(userId: number) {
    const url = `${this.apiUrl}/${userId}`;
    console.log(userId)
    return this.http.delete(url);
  }
}