import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = 'http://localhost:3000/tabelaclientes'

  constructor(private http: HttpClient) { }

  deleteCliente(clienteId: number){
    const url = `${this.apiUrl}/${clienteId}`;
    console.log(clienteId)
    return this.http.delete(url);
  }
}
